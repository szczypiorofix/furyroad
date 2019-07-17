import React from 'react';
import { connect } from 'react-redux';

import './MainGame.css';
import { MainMenuButton } from '../mainmenubutton/MainMenuButton';
import { GameRootState } from '../../models';
import { getGameMode, getGameStats } from '../../redux/selectors';
import { goToMainMenu, modFuel, modWater } from '../../redux/actions';
import { MainGameProps } from './MainGameModel';


export class MainGame extends React.Component<MainGameProps, {}> {

    render():JSX.Element {
        return (
            <React.Fragment>
                <div className="main-game-div">
                    <MainMenuButton
                        title="ZAPIS I WYJŚCIE"
                        active={ true }
                        onClick={ () => this.props.gotoMainMenu() }
                    />
                    <h1 className="maingame-title">FURY ROAD</h1>
                    <div className="main-view-container">
                        <div className="main-view-left">
                            <div className="statistics-panel">
                                <span> FUEL { this.props.stats.fuel }</span>
                                <span> WATER { this.props.stats.water}</span>
                            </div>
                            <MainMenuButton
                                title="+ 10 FUEL"
                                active={ true }
                                onClick={ () => this.props.modFuel(10) }
                            />
                            <MainMenuButton
                                title="- 10 FUEL"
                                active={ true }
                                onClick={ () => this.props.modFuel(-10) }
                            />
                            <MainMenuButton
                                title="+ 10 WATER"
                                active={ true }
                                onClick={ () => this.props.modWater(10) }
                            />
                            <MainMenuButton
                                title="- 10 WATER"
                                active={ true }
                                onClick={ () => this.props.modWater(-10) }
                            />
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
    }
}

const mapStateToProps = (state:GameRootState) => ({
    mainState:  getGameMode(state),
    stats: getGameStats(state)
 });
 
const mapDispatchToProps = (dispatch:any) => ({
    gotoMainMenu: () => dispatch(goToMainMenu()),
    modFuel: (amount: number) => dispatch(modFuel(amount)),
    modWater: (amount: number) => dispatch(modWater(amount))
});

export default connect(mapStateToProps, mapDispatchToProps)(MainGame);
