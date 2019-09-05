import React from 'react';
import { connect } from 'react-redux';

import './SplashScreen.scss';

import { SplashScreenProps, SplashScreenState } from './SplashScreenModel';
import { GameRootState, GameLogin } from '../../models';
import { goToMainMenu, login, setOffline, logout } from '../../redux/actions';
import { MainMenuButton } from '../mainmenubutton/MainMenuButton';
import { getLogin } from '../../redux/selectors';



export class SplashScreen extends React.Component<SplashScreenProps, SplashScreenState> {

    private logginPopupDiv: React.RefObject<HTMLDivElement>;

    state = { loginPopupVisible:false };

    constructor(props:any) {
        super(props);
        this.logginPopupDiv = React.createRef();
        
        if (this.logginPopupDiv.current)
            this.logginPopupDiv.current.id = "loginRegisterPopup";
    }

    componentDidMount() {
        this.setState({
            loginPopupVisible: false
        });
    }

    submitLoginForm = () => {
        let email: string = "";
        let pass: string = "";
        let emailField: any = document.getElementById("formEmail");
        if (emailField) {
            email = emailField.value;
            emailField.value = "";
        }
        let passField: any = document.getElementById("formPass");
        if (passField) {
            pass = passField.value;
            passField.value = "";
        }
        this.setState({loginPopupVisible: false });
        
        fetch("/api/login", {
            method: "POST",
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: pass
            })
        }).then( (res) => res.json() ).then( (user: GameLogin) => {
            this.props.login(user);
        });
    }

    loginRegisterPopup() {
        let showPopupString: string = "none";
        if (this.state && this.state.loginPopupVisible)
        showPopupString = this.state.loginPopupVisible ? "flex" : "none";
        return <div id="loginRegisterPopup" ref={this.logginPopupDiv} style = {{display: showPopupString}} >
            <span className="form-title">Zaloguj się do gry</span>
            <div id="loginform">
                <div className="field">
                    <span>e-mail</span>
                    <input id="formEmail" type="email" name="email" required/>
                </div>
                <div className="field">
                    <span>hasło</span>
                    <input id="formPass" type="password" name="password" required/>
                </div>
                <button onClick={this.submitLoginForm}>Zaloguj</button>
                <button type="reset" onClick={ () => { this.setState({loginPopupVisible: false })} }>Anuluj</button>
            </div>
        </div>
    }

    loginRegisterButton() {
        return (
            <MainMenuButton
                title="Logowanie / Rejestracja"
                active={ true }
                onClick={ () => this.setState({loginPopupVisible: !this.state.loginPopupVisible}) }
            />
        );
    }

    continueButton() {
        return (
            <React.Fragment>
                <MainMenuButton
                    title= {"Kontynuuj: " + this.props.getLogin.email}
                    active={ true }
                    onClick={ () => {
                        this.props.setOffline(false);
                        this.props.gotoMainMenu();
                    } }
                />
                <MainMenuButton
                    title= {"Wyloguj"}
                    active={ true }
                    onClick={ () => {
                        this.props.setOffline(false);
                        this.props.logout(this.props.getLogin);
                    } }
                />
            </React.Fragment>
        );
    }

    render():JSX.Element {
        return (
            <React.Fragment>
                <div className="splash-screen-main">
                    <h1>FURY ROAD...</h1>
                    {this.loginRegisterPopup()}
                    
                    <div className="splash-buttons">
                        { this.props.getLogin.email === "" ? this.loginRegisterButton() : this.continueButton() }
                        <MainMenuButton
                            title="Graj lokalnie"
                            active={ true }
                            onClick={ () => {
                                this.props.setOffline(true);
                                this.props.gotoMainMenu();
                            }}
                        />
                        <MainMenuButton
                            title="#CHANGELOG"
                            active={ true }
                            onClick={ () => {
                                console.log("Show changelog.");
                            }}
                        />
                    </div>
                    
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state: GameRootState) => ({
    getLogin: getLogin(state),
});
 
const mapDispatchToProps = (dispatch: any) => ({
    gotoMainMenu: () => dispatch(goToMainMenu()),
    login: (gameLogin: GameLogin) => dispatch(login(gameLogin)),
    logout: (gameLogin: GameLogin) => dispatch(logout(gameLogin)),
    setOffline: (v: boolean) => dispatch(setOffline(v)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
