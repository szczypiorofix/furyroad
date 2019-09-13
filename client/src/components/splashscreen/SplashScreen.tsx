import { IGameLogin, ILoginResponseType, ISavedState, IUser } from "furyroad-interfaces";
import moment from "moment";
import React from "react";
import { connect } from "react-redux";

import "./SplashScreen.scss";

import { IGameRootState } from "../../models";
import { goToMainMenu, loadSavedState, login, logout, resetSavedState, setOffline, toggleContinueGame } from "../../redux/actions";
import { getLogin, getGameSettings } from "../../redux/selectors";
import { MainMenuButton } from "../mainmenubutton/MainMenuButton";
import { IChangeLogContent, ISplashScreenProps, ISplashScreenState } from "./SplashScreenModel";

export class SplashScreen extends React.Component<ISplashScreenProps, ISplashScreenState> {
  public state = { loginPopupVisible: false, changeLogVisible: false, changeLogContent: [] };
  private logginPopupDiv: React.RefObject<HTMLDivElement>;

  constructor(props: any) {
    super(props);
    this.logginPopupDiv = React.createRef();

    if (this.logginPopupDiv.current) {
      this.logginPopupDiv.current.id = "loginRegisterPopup";
    }
  }

  public componentDidMount() {
    this.setState({
      loginPopupVisible: false,
    });
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
      console.log(resp);
      if (resp.data) {
        console.log(resp.data.email);
        this.props.loadSavedState({
          gamestats: resp.data.stats,
          gameeventshistory: [],
          gamelogin: {
            email: resp.data.email,
            uuid: resp.data.uuid,
            password: resp.data.password
          },
          gamesettings: {
            canContinue: true,
            musicOn: true,
            musicVolume: 100,
            offline: false
          }
        });
        this.props.toggleContinueGame(true);
        this.props.login(resp.data);
      }
    });
  };

  public loginRegisterPopup() {
    let showPopupString: string = "none";
    if (this.state && this.state.loginPopupVisible) {
      showPopupString = this.state.loginPopupVisible ? "flex" : "none";
    }
    return (
      <div id="loginRegisterPopup" ref={this.logginPopupDiv} style={{ display: showPopupString }}>
        <span className="form-title">Zaloguj się do gry</span>
        <div id="loginform">
          <div className="field">
            <span>e-mail</span>
            <input id="formEmail" type="email" name="email" required />
          </div>
          <div className="field">
            <span>hasło</span>
            <input id="formPass" type="password" name="password" required />
          </div>
          <button onClick={this.submitLoginForm}>Zaloguj</button>
          <button
            type="reset"
            onClick={() => {
              this.setState({ loginPopupVisible: false });
            }}
          >
            Anuluj
          </button>
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

  public showChangelogInfo() {
    let showChangeLogString: string = "none";

    let items: any;
    if (this.state && this.state.changeLogContent) {
      items = this.state.changeLogContent.map((item: IChangeLogContent, key) => (
        <li key={item._id}>
          {moment(item.date).format("YYYY-MM-DD - HH:mm")}: {item.text}
        </li>
      ));
    }

    if (this.state && this.state.changeLogVisible) {
      showChangeLogString = this.state.changeLogVisible ? "block" : "none";
    }
    return (
      <div style={{ display: showChangeLogString }} className="changelogdiv">
        <button onClick={() => this.setState({ changeLogVisible: false })}>X</button>
        <div className="changelog-content">
          <ul>{items}</ul>
        </div>
      </div>
    );
  }

  public render(): JSX.Element {
    return (
      <React.Fragment>
        <div className="splash-screen-main">
          <h1>FURY ROAD...</h1>
          {this.loginRegisterPopup()}
          {this.showChangelogInfo()}

          <div className="splash-buttons">
            {this.props.getLogin.email === "" ? this.loginRegisterButton() : this.continueButton()}
            <MainMenuButton
              title="Graj lokalnie"
              active={true}
              onClick={() => {
                this.props.setOffline(true);
                this.props.gotoMainMenu();
              }}
            />
            <MainMenuButton
              title="#CHANGELOG"
              active={true}
              onClick={() => {
                fetch("/api/news", {
                  method: "GET",
                  headers: {
                    "Content-Type": "application/json",
                  },
                })
                  .then(res => res.json())
                  .then((content: IChangeLogContent[]) => this.setState({ changeLogContent: content }));
                this.setState({ changeLogVisible: !this.state.changeLogVisible });
              }}
            />
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
