import React from 'react';
import { connect } from 'react-redux';

import './MainMenu.scss';
import { MainMenuButton } from '../mainmenubutton/MainMenuButton';
import { GameRootState, SavedState } from '../../models';
import { getGameMode, getGameSettings } from '../../redux/selectors';
import { goToNewGame, goToJunkyard, goToSettings, continueGame, resetSavedState, toggleContinueGame } from '../../redux/actions';
import { MainMenuProps } from './MainMenuModel';
import { LOCAL_STORAGE_SAVED_STATE_NAME } from '../../redux/store';
import initialState from '../../redux/initialstate';



export class MainMenu extends React.Component<MainMenuProps, {}> {

    render():JSX.Element {
        
        if (localStorage.getItem(LOCAL_STORAGE_SAVED_STATE_NAME)) {
            console.log("STATE IN LOCALSTORAGE - OK");
            const checkStore = localStorage.getItem(LOCAL_STORAGE_SAVED_STATE_NAME);
            if ( checkStore !== null) {
                let storeObjects:SavedState = JSON.parse(checkStore);
                if (storeObjects.gamesettings.canContinue) {
                    // this.props.toggleContinueGame(true);   
                }
            }
        } else {
            console.log("NO STATE IN LOCALSTORAGE");
            // OK jeszcze sprawdzanie wersji, jeśli starsza to resetSavedState
            this.props.resetSavedState(initialState.savedstate);
        }
        
        return (
            <React.Fragment>
                <div className="mainmenu-bg">
                    <div className="mainmenu-content">
                        <h1 className="mainmenu-gametitle">FURY ROAD</h1>
                        <div className="buttons-div">
                            <MainMenuButton 
                                title="Kontynuuj"
                                active={ this.props.gameSettings.canContinue }
                                onClick={ () => this.props.continueGame() }
                            />
                            <MainMenuButton
                                title="Nowa gra"
                                active={ true }
                                onClick={ () => {
                                    this.props.resetSavedState(initialState.savedstate);
                                    this.props.startNewGame();
                                } }
                            />
                            <MainMenuButton
                                title="Śmietnisko"
                                active={ true }
                                onClick={ () => this.props.gotoJunkyard() }
                            />
                            <MainMenuButton
                                title="Ustawienia"
                                active={ true }
                                onClick={ () => this.props.gotoSettings() }
                            />
                        </div>
                    </div>                    
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state:GameRootState) => ({
    gameMode:  getGameMode(state),
    gameSettings: getGameSettings(state)
 });
 
const mapDispatchToProps = (dispatch:any) => ({
    startNewGame: () => dispatch(goToNewGame()),
    gotoJunkyard: () => dispatch(goToJunkyard()),
    gotoSettings: () => dispatch(goToSettings()),
    continueGame: () => dispatch(continueGame()),
    toggleContinueGame: (v:boolean) => dispatch(toggleContinueGame(v)),

    resetSavedState: (initial: SavedState) => dispatch(resetSavedState(initial)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainMenu);
