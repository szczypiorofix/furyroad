import { faCheck, faEnvelope, faLock, faNotEqual, faTimes } from "@fortawesome/free-solid-svg-icons";
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
    registerPopupVisible: false,
    registerPasswordsMatch: false,
    changeLogVisible: false,
    changeLogContentLoading: true,
    changeLogContent: RESET_RESPONSE,
  };
  private logginPopupDiv: React.RefObject<HTMLDivElement>;
  private registerPopupDiv: React.RefObject<HTMLDivElement>;

  private formLoginEmailInput: React.RefObject<HTMLInputElement>;
  private formLoginPassInput: React.RefObject<HTMLInputElement>;

  private formRegisterEmailInput: React.RefObject<HTMLInputElement>;
  private formRegisterPassInput: React.RefObject<HTMLInputElement>;
  private formRegisterPassDoubleInput: React.RefObject<HTMLInputElement>;

  private formRegisterPasswordMatch: React.RefObject<HTMLElement>;

  constructor(props: any) {
    super(props);
    this.logginPopupDiv = React.createRef();
    this.registerPopupDiv = React.createRef();

    this.formLoginEmailInput = React.createRef();
    this.formLoginPassInput = React.createRef();

    this.formRegisterEmailInput = React.createRef();
    this.formRegisterPassInput = React.createRef();
    this.formRegisterPassDoubleInput = React.createRef();
    this.formRegisterPasswordMatch = React.createRef();

    if (this.logginPopupDiv.current) {
      this.logginPopupDiv.current.id = "loginPopup";
    }

    if (this.registerPopupDiv.current) {
      this.registerPopupDiv.current.id = "registerPopup";
    }
  }

  public validatePasswordInputs(
    input1: React.RefObject<HTMLInputElement>,
    input2: React.RefObject<HTMLInputElement>,
  ): boolean {
    if (input1.current && input2.current) {
      if (
        input1.current.value === input2.current.value &&
        input1.current.value.length >= 6 &&
        input2.current.value.length >= 6
      ) {
        return true;
      }
    }
    return false;
  }

  public inputKeyboardListener = (e: KeyboardEvent) => {
    const event = e || window.event;
    const charCode = event.which || event.keyCode;

    if (this.validatePasswordInputs(this.formRegisterPassInput, this.formRegisterPassDoubleInput)) {
      this.setState({ registerPasswordsMatch: true });
    } else {
      this.setState({ registerPasswordsMatch: false });
    }

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
      changeLogVisible: false,
      registerPasswordsMatch: false,
      registerPopupVisible: false,
      changeLogContentLoading: false,
    });

    if (this.formLoginEmailInput.current && this.formLoginPassInput.current) {
      this.formLoginEmailInput.current.addEventListener("keyup", e => {
        this.inputKeyboardListener(e);
      });
      this.formLoginPassInput.current.addEventListener("keyup", e => {
        this.inputKeyboardListener(e);
      });
    }

    if (
      this.formRegisterEmailInput.current &&
      this.formRegisterPassInput.current &&
      this.formRegisterPassDoubleInput.current
    ) {
      this.formRegisterEmailInput.current.addEventListener("keyup", e => {
        this.inputKeyboardListener(e);
      });
      this.formRegisterPassInput.current.addEventListener("keyup", e => {
        this.inputKeyboardListener(e);
      });
      this.formRegisterPassDoubleInput.current.addEventListener("keyup", e => {
        this.inputKeyboardListener(e);
      });
    }
  }

  public submitRegisterForm = () => {
    let email: string = "";
    let pass: string = "";
    let pass2: string = "";
    const emailField: any = document.getElementById("formRegisterEmail");
    if (emailField) {
      email = emailField.value;
      emailField.value = "";
    }
    const passField: any = document.getElementById("formRegisterPass");
    if (passField) {
      pass = passField.value;
      passField.value = "";
    }
    const pass2Field: any = document.getElementById("formRegisterPassDouble");
    if (pass2Field) {
      pass2 = pass2Field.value;
      pass2Field.value = "";
    }
    this.setState({ loginPopupVisible: false });

    if (email.length > 0 && pass.length > 0 && pass2.length > 0) {
      if (pass === pass2) {
        fetch("/api/users", {
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
            if (resp.msg === "Success") {
              alert("Rejestracja przebiegła pomyślnie, teraz możesz się zalogować");
            }
            if (resp.msg === "Warning") {
              console.warn(resp.error);
              alert(resp.error);
            }
          });
      } else {
        console.error("Hasła nie są identyczne !!!");
        alert("Hasła nie są identyczne !!!");
      }
    } else {
      console.error("Email and/or password cannot be empty !!!");
      alert("Email and/or password cannot be empty !!!");
    }
  };

  public submitLoginForm = () => {
    let email: string = "";
    let pass: string = "";
    const emailField: any = document.getElementById("formLoginEmail");
    if (emailField) {
      email = emailField.value;
      emailField.value = "";
    }
    const passField: any = document.getElementById("formLoginPass");
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
      alert("Email and/or password cannot be empty !!!");
    }
  };

  public registerPopup() {
    let showPopupString: string = "none";
    if (this.state && this.state.registerPopupVisible) {
      showPopupString = this.state.registerPopupVisible ? "flex" : "none";
    }
    return (
      <div id="registerPopup" ref={this.registerPopupDiv} style={{ display: showPopupString }}>
        <div className="title-and-close">
          <span className="form-title">Zarejestruj się</span>
          <button
            type="reset"
            onClick={() => {
              this.setState({ registerPopupVisible: false });
            }}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
        <div id="registerform">
          <div className="field">
            <span>
              <FontAwesomeIcon icon={faEnvelope} />
            </span>
            <input
              id="formRegisterEmail"
              ref={this.formRegisterEmailInput}
              type="email"
              placeholder="e-mail"
              name="email"
              required
            />
          </div>
          <div className="field">
            <span>
              <FontAwesomeIcon icon={faLock} />
            </span>
            <input
              id="formRegisterPass"
              ref={this.formRegisterPassInput}
              type="password"
              placeholder="hasło (min 6 znaków)"
              name="password"
              required
            />
          </div>
          <div className="indicator">
            <span ref={this.formRegisterPasswordMatch}>
              {this.state.registerPasswordsMatch && this.formRegisterEmailInput.current && this.formRegisterEmailInput.current.value.length > 5 && this.formRegisterEmailInput.current.value.includes("@") ? (
                <span className="passwordMatchCheck">
                  <FontAwesomeIcon icon={faCheck} />
                </span>
              ) : (
                <span className="passwordMatchNoEqual">
                  <FontAwesomeIcon icon={faNotEqual} />
                </span>
              )}
            </span>
          </div>
          <div className="field">
            <span>
              <FontAwesomeIcon icon={faLock} />
            </span>
            <input
              id="formRegisterPassDouble"
              ref={this.formRegisterPassDoubleInput}
              type="password"
              placeholder="powtórz hasło"
              name="password"
              required
            />
          </div>
          <button onClick={this.submitRegisterForm}>Rejestracja</button>
        </div>
      </div>
    );
  }

  public loginPopup() {
    let showPopupString: string = "none";
    if (this.state && this.state.loginPopupVisible) {
      showPopupString = this.state.loginPopupVisible ? "flex" : "none";
    }
    return (
      <div id="loginPopup" ref={this.logginPopupDiv} style={{ display: showPopupString }}>
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
            <input
              id="formLoginEmail"
              ref={this.formLoginEmailInput}
              type="email"
              placeholder="e-mail"
              name="email"
              required
            />
          </div>
          <div className="field">
            <span>
              <FontAwesomeIcon icon={faLock} />
            </span>
            <input
              id="formLoginPass"
              ref={this.formLoginPassInput}
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
      <React.Fragment>
        <MainMenuButton
          title="Logowanie"
          active={true}
          onClick={() => this.setState({ loginPopupVisible: !this.state.loginPopupVisible })}
        />
        <MainMenuButton
          title="Rejestracja"
          active={true}
          onClick={() => this.setState({ registerPopupVisible: !this.state.registerPopupVisible })}
        />
      </React.Fragment>
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
          {this.loginPopup()}
          {this.registerPopup()}
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
