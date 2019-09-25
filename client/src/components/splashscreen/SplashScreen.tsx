import { faEnvelope, faLock, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IGameLogin, ILoginResponseType, IResponseType, ISavedState, IUser } from "furyroad-interfaces";
import moment from "moment";
import React from "react";
import { connect } from "react-redux";

import "./SplashScreen.scss";

import { IGameRootState } from "../../models";
import {
  goToMainMenu,
  loadSavedState,
  login,
  logout,
  resetSavedState,
  setOffline,
  toggleContinueGame,
} from "../../redux/actions";
import { getGameSettings, getLogin } from "../../redux/selectors";
import { MainMenuButton } from "../mainmenubutton/MainMenuButton";
import { IChangeLogContent, ISplashScreenProps, ISplashScreenState } from "./SplashScreenModel";

const RESET_RESPONSE: IResponseType = {
  error: undefined,
  data: [],
  msg: "",
  statusCode: 0,
};

export class SplashScreen extends React.Component<ISplashScreenProps, ISplashScreenState> {
  public state = {
    loginPopupVisible: false,
    changeLogVisible: false,
    changeLogContentLoading: true,
    changeLogContent: RESET_RESPONSE,
  };
  private logginPopupDiv: React.RefObject<HTMLDivElement>;
  private formEmailInput: React.RefObject<HTMLInputElement>;
  private formPassInput: React.RefObject<HTMLInputElement>;

  constructor(props: any) {
    super(props);
    this.logginPopupDiv = React.createRef();

    this.formEmailInput = React.createRef();
    this.formPassInput = React.createRef();

    if (this.logginPopupDiv.current) {
      this.logginPopupDiv.current.id = "loginRegisterPopup";
    }
  }

  public inputKeyboardListener = (e: any) => {
    const event = e || window.event;
    const charCode = event.which || event.keyCode;
    if (charCode === 13) {
      this.submitLoginForm();
      return false;
    }
    if (charCode === 27) {
      this.setState({
        loginPopupVisible: false,
      });
    }
  };

  public componentDidMount() {
    this.setState({
      loginPopupVisible: false,
    });

    if (this.formEmailInput.current && this.formPassInput.current) {
      this.formEmailInput.current.addEventListener("keyup", e => {
        this.inputKeyboardListener(e);
      });
      this.formPassInput.current.addEventListener("keyup", e => {
        this.inputKeyboardListener(e);
      });
    }
  }

  public submitLoginForm = () => {
    let email: string = "";
    let pass: string = "";
    const emailField: any = document.getElementById("formEmail");
    if (emailField) {
      email = emailField.value;
      emailField.value = "";
    }
    const passField: any = document.getElementById("formPass");
    if (passField) {
      pass = passField.value;
      passField.value = "";
    }
    this.setState({ loginPopupVisible: false });

    if (email.length > 0 && pass.length > 0) {
      fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password: pass,
        }),
      })
        .then(res => res.json())
        .then((resp: ILoginResponseType) => {
          if (resp.data) {
            this.props.loadSavedState({
              gamestats: resp.data.stats,
              gameeventshistory: [],
              gamelogin: {
                email: resp.data.email,
                uuid: resp.data.uuid,
                password: resp.data.password,
              },
              gamesettings: {
                canContinue: true,
                musicOn: true,
                musicVolume: 100,
                offline: false,
              },
            });
            this.props.toggleContinueGame(true);
            this.props.login(resp.data);
          }
        });
    } else {
      console.error("Email and/or password cannot be empty !!!");
    }
  };

  public loginRegisterPopup() {
    let showPopupString: string = "none";
    if (this.state && this.state.loginPopupVisible) {
      showPopupString = this.state.loginPopupVisible ? "flex" : "none";
    }
    return (
      <div id="loginRegisterPopup" ref={this.logginPopupDiv} style={{ display: showPopupString }}>
        <div className="title-and-close">
          <span className="form-title">Zaloguj się do gry</span>
          <button
            type="reset"
            onClick={() => {
              this.setState({ loginPopupVisible: false });
            }}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <div id="loginform">
          <div className="field">
            <span>
              <FontAwesomeIcon icon={faEnvelope} />
            </span>
            <input id="formEmail" ref={this.formEmailInput} type="email" placeholder="e-mail" name="email" required />
          </div>
          <div className="field">
            <span>
              <FontAwesomeIcon icon={faLock} />
            </span>
            <input
              id="formPass"
              ref={this.formPassInput}
              type="password"
              placeholder="hasło"
              name="password"
              required
            />
          </div>
          <button onClick={this.submitLoginForm}>Zaloguj</button>
        </div>
      </div>
    );
  }

  public loginRegisterButton() {
    return (
      <MainMenuButton
        title="Logowanie / Rejestracja"
        active={true}
        onClick={() => this.setState({ loginPopupVisible: !this.state.loginPopupVisible })}
      />
    );
  }

  public continueButton() {
    return (
      <React.Fragment>
        <MainMenuButton
          title={"Kontynuuj: " + this.props.getLogin.email}
          active={true}
          onClick={() => {
            this.props.setOffline(false);
            this.props.gotoMainMenu();
          }}
        />
        <MainMenuButton
          title={"Wyloguj"}
          active={true}
          onClick={() => {
            this.props.setOffline(false);
            this.props.logout(this.props.getLogin);
          }}
        />
      </React.Fragment>
    );
  }

  public getChangelogInfo = async () => {
    if (this.state.changeLogContent.statusCode === 200) {
      return;
    }
    try {
      const response = await fetch("/api/news", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        this.setState({
          changeLogContentLoading: false,
          changeLogContent: {
            statusCode: 400,
            msg: response.statusText,
            data: [],
            error: "Błąd! " + response.status + " " + response.statusText,
          },
        });
        return;
      }
      const responseObject: IResponseType = await response.json();
      this.setState({
        changeLogContentLoading: false,
        changeLogContent: responseObject,
      });
    } catch (err) {
      console.error(err);
      this.setState({
        changeLogContent: {
          statusCode: 400,
          msg: err,
          data: [],
          error: "Błąd! " + err,
        },
      });
    }
  };

  public onChangeLogContentRequest() {
    this.setState({
      changeLogContentLoading: true,
      changeLogVisible: !this.state.changeLogVisible,
    });

    this.getChangelogInfo();
  }

  public render(): JSX.Element {
    const { changeLogVisible, changeLogContent, changeLogContentLoading } = this.state;
    const showChangeLogString = changeLogVisible ? "block" : "none";
    const changeLogContentHTML: JSX.Element[] = changeLogContent.data.map((item: IChangeLogContent) => (
      <li key={item._id}>
        {moment(item.date).format("YYYY-MM-DD - HH:mm")}: {item.text}
      </li>
    ));

    return (
      <React.Fragment>
        <div className="splash-screen-main">
          <h1>FURY ROAD</h1>
          {this.loginRegisterPopup()}
          <div style={{ display: showChangeLogString }} className="changelogdiv">
            <button onClick={() => this.setState({ changeLogVisible: false })}>X</button>
            <div className="changelog-content">
              {changeLogContent.error && <p>{changeLogContent.error}</p>}
              {changeLogContentLoading && changeLogContent.statusCode !== 200 && (
                <div className="ziuuu">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              )}
              <ul>{changeLogContentHTML}</ul>
            </div>
          </div>
          <div className="splash-buttons">
            {this.props.getLogin.email === "" ? this.loginRegisterButton() : this.continueButton()}
            {/* <MainMenuButton
              title="Graj lokalnie"
              active={true}
              onClick={() => {
                this.props.setOffline(true);
                this.props.gotoMainMenu();
              }}
            /> */}
            <MainMenuButton title="CHANGELOG" active={true} onClick={() => this.onChangeLogContentRequest()} />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: IGameRootState) => ({
  getLogin: getLogin(state),
  getSettings: getGameSettings(state),
});

const mapDispatchToProps = (dispatch: any) => ({
  gotoMainMenu: () => dispatch(goToMainMenu()),
  login: (user: IUser) => dispatch(login(user)),
  logout: (gameLogin: IGameLogin) => dispatch(logout(gameLogin)),
  setOffline: (v: boolean) => dispatch(setOffline(v)),
  resetSavedState: (initial: ISavedState) => dispatch(resetSavedState(initial)),
  loadSavedState: (initial: ISavedState) => dispatch(loadSavedState(initial)),
  toggleContinueGame: (v: boolean) => dispatch(toggleContinueGame(v)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SplashScreen);
