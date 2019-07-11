import React from 'react';
import { connect } from 'react-redux';

import './MainGame.css';
import {MainMenuButton} from '../mainmenubutton/MainMenuButton';

import { getGameMode, getGameStats } from '../../redux/selectors';
import { GameState, GameStateTypes, GameStats } from '../../models';
import { goToMainMenu } from '../../redux/actions';

interface GameModeProps {
    goToMainMenu?: () => void,
    gameMode?: GameStateTypes,
    gameStats?: GameStats
}

export class MainGame extends React.Component<GameModeProps, {}> {

    canContinue:boolean = false;

    goToMainMenu() {
        if (this.props && this.props.goToMainMenu) {
            this.props.goToMainMenu();
        }        
    }

    render():JSX.Element {
        if (this.props && this.props.gameStats)
        return (
            <React.Fragment>
                <div className="main-game-div">
                    <MainMenuButton
                        title="ZAPIS I WYJŚCIE"
                        active={ true }
                        onClick={ () => this.goToMainMenu() }
                    />
                    <h1 className="maingame-title">FURY ROAD</h1>
                    <div className="main-view-container">
                        <div className="main-view-left">
                            <div className="statistics-panel">
                                <span>FUEL {this.props.gameStats.fuel}</span>
                                <span>FUEL CONSUMPTION {this.props.gameStats.fuelConsumption}</span>
                                <span>SPEED {this.props.gameStats.currentSpeed}</span>
                                <span>DISTANCE {this.props.gameStats.distance}</span>
                                <span>{this.props.gameStats.carHealth} / {this.props.gameStats.carMaxHealth} </span>
                                <span>ATTACK {this.props.gameStats.carAttactRatio}</span>
                                <span>DEFENCE {this.props.gameStats.carShields}</span>
                            </div>
                        </div>
                        <div className="main-view-middle">
                            <div className="events-panel">
                                <p>Eventy</p>
                            </div>
                        </div>
                        <div className="main-view-right">
                            <div className="upgrades-panel">
                                <p>Upgrades</p>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
        else
        return <div>...</div>
    }
}

const mapStateToProps = (state:GameState) => ({
    gameMode: getGameMode(state),
    gameStats: getGameStats(state)
 });
 
const mapDispatchToProps = (dispatch:any) => ({
    goToMainMenu: () => dispatch(goToMainMenu())
});

export default connect(mapStateToProps, mapDispatchToProps)(MainGame);
