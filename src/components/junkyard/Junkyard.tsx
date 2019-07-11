import React from 'react';
import { connect } from 'react-redux';

import './Junkyard.css';
import {MainMenuButton} from '../mainmenubutton/MainMenuButton';

import { getGameMode } from '../../redux/selectors';
import { GameState, GameStateTypes } from '../../models';
import { goToMainMenu } from '../../redux/actions';

interface GameModeProps {
    goToMainMenu?: () => void,
    gameMode?: GameStateTypes
}

export class Junkyard extends React.Component<GameModeProps, {}> {

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
                <h2 className="junkyard-title">THIS IS JUNKYARD MENU</h2>
                <h3>Śmietnisko - to tutaj składowane są bezużyteczne, martwe roboty</h3>
                <MainMenuButton 
                    title="MENU GŁÓWNE"
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

export default connect(mapStateToProps, mapDispatchToProps)(Junkyard);
