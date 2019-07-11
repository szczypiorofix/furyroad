import React from 'react';
import { connect } from 'react-redux';

import './MainGame.css';
import {MainMenuButton} from '../mainmenubutton/MainMenuButton';

import { getGameMode } from '../../redux/selectors';
import { GameState, GameStateTypes } from '../../models';
import { goToMainMenu } from '../../redux/actions';

interface GameModeProps {
    goToMainMenu?: () => void,
    gameMode?: GameStateTypes
}

export class MainGame extends React.Component<GameModeProps, {}> {

    canContinue:boolean = false;

    goToMainMenu() {
        if (this.props && this.props.goToMainMenu) {
            this.props.goToMainMenu();
        }        
    }

    render():JSX.Element {
        console.log("CURRENT GAME MODE: " + this.props.gameMode);
        return (
            <React.Fragment>
                <h2 className="maingame-title">THIS IS MAIN GAME VIEW</h2>
                <h3>This is the new game, seriously...</h3>
                <MainMenuButton 
                    title="MENU GŝÓWNE"
                    active={ true }
                    onClick={ () => this.goToMainMenu() }
                />
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state:GameState) => ({
    gameMode: getGameMode(state),
 });
 
const mapDispatchToProps = (dispatch:any) => ({
    goToMainMenu: () => dispatch(goToMainMenu())
});

export default connect(mapStateToProps, mapDispatchToProps)(MainGame);
