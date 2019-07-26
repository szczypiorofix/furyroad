import React from 'react';
import { connect } from 'react-redux';

import './MainMenu.scss';
import { MainMenuButton } from '../mainmenubutton/MainMenuButton';
import { GameRootState, SavedState } from '../../models';
import { getGameMode } from '../../redux/selectors';
import { goToNewGame, goToJunkyard, goToSettings, continueGame, resetSavedState } from '../../redux/actions';
import { MainMenuProps } from './MainMenuModel';
import { LOCAL_STORAGE_SAVED_STATE_NAME } from '../../redux/store';
import initialState from '../../redux/initialstate';



export class MainMenu extends React.Component<MainMenuProps, {}> {

    canContinue:boolean = false;

    componentDidMount() {
        // let gameMusic1 = new Audio('./music/music1.mp3'); 
        // gameMusic1.addEventListener('ended', function() {
        //     this.currentTime = 0;
        //     // this.play();
        // }, false);
        // gameMusic1.play();   
    }

    render():JSX.Element {
        
        if (localStorage.getItem(LOCAL_STORAGE_SAVED_STATE_NAME)) {
            console.log("STATE LOADED");
            this.canContinue = true;
        } else {
            console.log("NO STATE");
        }

        return (
            <React.Fragment>
                <div className="mainmenu-bg">
                    <div className="mainmenu-content">
                        <h1 className="mainmenu-gametitle">FURY ROAD</h1>
                        <div className="buttons-div">
                            <MainMenuButton 
                                title="Kontynuuj"
                                active={ this.canContinue }
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
    gameMode:  getGameMode(state)
 });
 
const mapDispatchToProps = (dispatch:any) => ({
    startNewGame: () => dispatch(goToNewGame()),
    gotoJunkyard: () => dispatch(goToJunkyard()),
    gotoSettings: () => dispatch(goToSettings()),
    continueGame: () => dispatch(continueGame()),

    resetSavedState: (initial: SavedState) => dispatch(resetSavedState(initial)),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainMenu);
