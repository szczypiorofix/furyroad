import React from 'react';
import { connect } from 'react-redux';

import './MainGame.css';

import { MainMenuButton } from '../mainmenubutton/MainMenuButton';
import { GameRootState, StatToModify, GameStatsEnum } from '../../models';
import { getGameMode, getGameStats, getGameEvents } from '../../redux/selectors';
import { goToMainMenu, modStat, setStat, goToEndGame } from '../../redux/actions';
import { MainGameProps, MainGameState } from './MainGameModel';
import { saveGameState, LOCAL_STORAGE_SAVED_STATE_NAME } from '../../redux/store';
import { GameEvents, GameEvent, initialGameEvent, historyEventsMaxList, EventResults } from './gameevents/GameEvents';

// import { TileSet } from '../../graphics';



export class MainGame extends React.Component<MainGameProps, MainGameState> {

    timer:any;
    eventsMaxCount: number = 0;
    eventStep: number = 0;

    callForEvent() {

        this.eventStep--;
        
        if (this.eventStep <= 0) {
            
            let drawnEventNumber: number = 0;
            let randomEventChance: number = 0;

            do {
                drawnEventNumber = Math.floor(Math.random() * this.eventsMaxCount);
                randomEventChance = Math.floor(Math.random() * 100);
            } while(randomEventChance >= GameEvents[drawnEventNumber].chance);            

            if (this.state.historyOfEvents.length > historyEventsMaxList) {
                this.state.historyOfEvents.shift();
            }

            this.state.historyOfEvents.push(GameEvents[drawnEventNumber]);
            this.setState({
                currentEvent: GameEvents[drawnEventNumber],
                historyOfEvents: this.state.historyOfEvents
            });

            this.updateScroll();
            this.eventStep = Math.floor(Math.random() * 3) + 2;


            for (let i:number = 0; i < GameEvents[drawnEventNumber].result.succ.length; i++) {
                switch(GameEvents[drawnEventNumber].result.succ[i].res) {
                    case EventResults.FOUND_FOOD:
                        this.props.modStat({attribute: GameStatsEnum.FOOD, value: GameEvents[drawnEventNumber].result.succ[i].value});
                        break;
                    case EventResults.FOUND_FUEL:
                        this.props.modStat({attribute: GameStatsEnum.FUEL, value: GameEvents[drawnEventNumber].result.succ[i].value});
                        break;
                    case EventResults.FOUND_SCRAP:
                        this.props.modStat({attribute: GameStatsEnum.SCRAP, value: GameEvents[drawnEventNumber].result.succ[i].value});
                        break;
                    case EventResults.FOUND_WATER:
                        this.props.modStat({attribute: GameStatsEnum.FOOD, value: GameEvents[drawnEventNumber].result.succ[i].value});
                        break;
                    default:
                        break;
                }
            }
        }

        // ZUŻYCIE PALIWA:
        this.props.modStat({attribute: GameStatsEnum.FUEL, value: -this.props.stats.carFuelUsage});

        // ZUŻYCIE JEDZENIA:
        this.props.modStat({attribute: GameStatsEnum.FOOD, value: -0.25});

        // ZUŻYCIE WODY:
        this.props.modStat({attribute: GameStatsEnum.WATER, value: -0.25});

        // OBSŁUGA TEMPERATURY
        if (this.props.stats.carTemperature < 90)
            this.props.modStat({attribute: GameStatsEnum.CARTEMPERATURE, value: 2});

        // OBLICACZNIE DYSTANSU
        this.props.modStat({attribute: GameStatsEnum.DISTANCEDRIVEN, value: (this.props.stats.carSpeed / 3600) });


        if (this.props.stats.fuel <= 0 || this.props.stats.carHealth <= 0 || this.props.stats.food <= 0 || this.props.stats.water <= 0) {
            localStorage.removeItem(LOCAL_STORAGE_SAVED_STATE_NAME);
            this.props.goToEndGame()
        }
    }


    componentDidMount() {
        this.setState({currentEvent: initialGameEvent, historyOfEvents: this.props.getGameEvents});

        this.eventStep = 0;
        this.eventsMaxCount = GameEvents.length;
        this.timer = setInterval( () => this.callForEvent(), 1000);
    }


    componentWillUnmount() {
        this.eventStep = 0;
        this.eventsMaxCount = 0;
        clearInterval(this.timer);
    }


    // Update the events panel to the bottom
    updateScroll() {
        var element = document.getElementById("eventsHistory");
        if (element)
            element.scrollTop = element.scrollHeight;
    }


    componentWillReceiveProps(nextProps:MainGameProps){
        if (nextProps.getGameEvents !== this.props.getGameEvents) {
          this.setState({ historyOfEvents : nextProps.getGameEvents })
        }
    }


    render():JSX.Element {
        if (this.state)
        return (
            <React.Fragment>
                <div className="main-game-div">
                    <div className="main-game-header">
                        <MainMenuButton
                            title="ZAPIS I WYJŚCIE"
                            active={ true }
                            onClick={ () => {
                                saveGameState({gamestats:  this.props.stats, gameeventshistory: this.state.historyOfEvents} )
                                this.props.gotoMainMenu()
                            } }
                        />
                        <span className="maingame-title">FURY ROAD</span>                        
                        <div className="imageFuel">
                            <div className="imageFuelIndicator" style={{transform: "rotate("+ Math.floor( ( (this.props.stats.fuel * 180) / this.props.stats.maxFuel) - 90) +"deg)" }}></div>
                        </div>
                        <div className="imageCarTemperature">
                            <div className="imageCarTemperatureIndicator" style={{transform: "rotate("+( ( (this.props.stats.carTemperature * 180) / this.props.stats.carMaxTemperature) - 90) +"deg)" }}></div>
                        </div>
                    </div>
                    <div className="main-view-container">
                        <div className="main-view-left">
                            <span>STATYSTYKI:</span>
                            <div className="statistics-panel">
                                <div className="stats-part">
                                    <span> DYSTANS :</span>
                                    <span> { this.props.stats.distanceDriven.toFixed(3) } km</span>
                                </div>
                                <div className="stats-part">
                                    <span> PRĘDKOŚĆ :</span>
                                    <span> { this.props.stats.carSpeed.toFixed(2) } km/h</span>
                                </div>
                                <div className="stats-part">
                                    <span> PALIWO :</span>
                                    <span> { this.props.stats.fuel.toFixed(2) } L</span>
                                </div>
                                <div className="stats-part">
                                    <span> WODA :</span>
                                    <span> { this.props.stats.water.toFixed(2)}</span>
                                </div>
                                <div className="stats-part">
                                    <span> ŻYWNOŚĆ :</span>
                                    <span> { this.props.stats.food.toFixed(2)}</span>
                                </div>
                                <div className="stats-part">
                                    <span> ZŁOM :</span>
                                    <span> { this.props.stats.scrap}</span>
                                </div>
                                <div className="stats-part">
                                    <span> AUTO :</span>
                                    <span> { this.props.stats.carHealth} / {this.props.stats.carMaxHealth}</span>
                                </div>
                                <div className="stats-part">
                                    <span> TEMPERATURA :</span>
                                    <span> { this.props.stats.carTemperature } &#x2103;</span>
                                </div>
                                
                            </div>
                            <MainMenuButton
                                title="<HACK> ENDGAME"
                                active={ true }
                                onClick={ () => this.props.goToEndGame() }
                            />
                            {/* <MainMenuButton
                                title="+ 10 FUEL"
                                active={ true }
                                onClick={ () => this.props.modStat({attribute: GameStatsEnum.FUEL, value: 10}) }
                            />
                            */}
                        </div>
                        <div className="main-view-middle">
                            <div className="events-panel">
                                <span>Wydarzenia:</span>
                                <div className="history-events-container">
                                    <ul id="eventsHistory" className="history-events">
                                        { this.state.historyOfEvents.map(function(item:GameEvent, i:number) {
                                            return <li key={i}>{ item.name }: { item.text }</li>
                                            })
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="main-view-right">
                            <div className="upgrades-panel">
                                <span>Upgrades</span>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
        else return <div>...</div>
    }
}


const mapStateToProps = (state:GameRootState) => ({
    mainState:  getGameMode(state),
    stats: getGameStats(state),
    getGameEvents: getGameEvents(state)
});


const mapDispatchToProps = (dispatch:any) => ({
    gotoMainMenu: () => dispatch(goToMainMenu()),
    goToEndGame: () => dispatch(goToEndGame()),
    modStat: (stat: StatToModify) => dispatch(modStat(stat)),
    setStat: (stat: StatToModify) => dispatch(setStat(stat))
});


export default connect(mapStateToProps, mapDispatchToProps)(MainGame);
