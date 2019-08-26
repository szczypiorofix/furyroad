import React from 'react';
import { connect } from 'react-redux';

import './SplashScreen.scss';

import { SplashScreenProps, SplashScreenState } from './SplashScreenModel';
import { GameRootState } from '../../models';
import { goToMainMenu } from '../../redux/actions';
import { MainMenuButton } from '../mainmenubutton/MainMenuButton';



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

    loginRegisterPopup() {
        let showPopupString: string = "none";
        if (this.state && this.state.loginPopupVisible)
        showPopupString = this.state.loginPopupVisible ? "flex" : "none";
        return <div id="loginRegisterPopup" ref={this.logginPopupDiv} style = {{display: showPopupString}} >
            <span>Zaloguj się do gry</span>
            <form action="login.php">
                <button type="submit">Zaloguj</button>
                <button type="reset" onClick={ () => { this.setState({loginPopupVisible: false })} }>Anuluj</button>
            </form>
        </div>
    }

    render():JSX.Element {
        return (
            <React.Fragment>
                <div className="splash-screen-main">
                    <h1>FURY ROAD...</h1>
                    {this.loginRegisterPopup()}
                    
                    <div className="splash-buttons">
                        <MainMenuButton
                            title="Logowanie / Rejestracja"
                            active={ true }
                            onClick={ () => this.setState({loginPopupVisible: !this.state.loginPopupVisible}) }
                        />
                        
                        <MainMenuButton
                            title="Graj lokalnie"
                            active={ true }
                            onClick={ () => this.props.gotoMainMenu() }
                        />
                    </div>
                    
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state:GameRootState) => ({

});
 
const mapDispatchToProps = (dispatch:any) => ({
    gotoMainMenu: () => dispatch(goToMainMenu()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
