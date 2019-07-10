import React from 'react';
import { connect } from 'react-redux';

import './MainMenu.css';
import {MainMenuButton} from '../mainmenubutton/MainMenuButton';

import { getGameMode } from '../../redux/selectors';
import { GameState } from '../../models';
import { continueGame, startNewGame, goToJunkyard, goToSettings } from '../../redux/actions';

interface GameModeProps {
    startNewGame?: () => void,
    goToJunkyard?: () => void,
    continueGame?: () => void,
    goToSettings?: () => void,
    gameMode?: string
}

export class MainMenu extends React.Component<GameModeProps, {}> {

    canContinue:boolean = false;

    continueGame = () => {
        if (this.props && this.props.gameMode && this.props.continueGame) {
            this.props.continueGame();
        }        
    }

    startNewGame = () => {
        if (this.props && this.props.gameMode && this.props.startNewGame) {
            this.props.startNewGame();
        }        
    }

    goToJunkJard = () => {
        if (this.props && this.props.gameMode && this.props.goToJunkyard) {
            this.props.goToJunkyard();
        }        
    }

    goToSettings = () => {
        if (this.props && this.props.gameMode && this.props.goToSettings) {
            this.props.goToSettings();
        }        
    }

    render():JSX.Element {
        console.log("CURRENT GAME MODE: " + this.props.gameMode);
        return (
            <React.Fragment>
                <div className="mainmenu-bg">
                    <div className="mainmenu-content">
                        <h1 className="mainmenu-gametitle">FURY ROAD</h1>
                        <div className="buttons-div">
                            <MainMenuButton 
                                title="Kontynuuj"
                                active={ this.canContinue }
                                onClick={ this.continueGame }
                            />
                            <MainMenuButton
                                title="Nowa gra"
                                active={true}
                                onClick={ this.startNewGame }
                            />
                            <MainMenuButton
                                title="Śmietnisko"
                                active={true}
                                onClick={ this.goToJunkJard }
                            />
                            <MainMenuButton
                                title="Ustawienia"
                                active={true}
                                onClick={ this.goToSettings }
                            />
                        </div>
                    </div>                    
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state:GameState) => ({
    gameMode: getGameMode(state),
 });
 
const mapDispatchToProps = (dispatch:any) => ({
    startNewGame: () => dispatch(startNewGame()),
    goToJunkyard: () => dispatch(goToJunkyard()),
    continueGame: () => dispatch(continueGame()),
    goToSettings: () => dispatch(goToSettings())
});

export default connect(mapStateToProps, mapDispatchToProps)(MainMenu);
