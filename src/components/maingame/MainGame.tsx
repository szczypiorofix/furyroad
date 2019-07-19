import React from 'react';
import { connect } from 'react-redux';

import './MainGame.css';
import { MainMenuButton } from '../mainmenubutton/MainMenuButton';
import { GameRootState, GameStatsEnum, StatToModify } from '../../models';
import { getGameMode, getGameStats } from '../../redux/selectors';
import { goToMainMenu, modStat } from '../../redux/actions';
import { MainGameProps, MainGameState, initialGameEvent } from './MainGameModel';
import { saveGameState } from '../../redux/store';
import { GameEvents, GameEvent } from './gameevents/GameEvents';




export class MainGame extends React.Component<MainGameProps, MainGameState> {

    timer:any;
    eventsMaxCount: number = 0;
    eventStep: number = 0;

    callForEvent() {

        this.eventStep--;
        
        if (this.eventStep <= 0) {
            
            let randomEventNumber: number = 0;
            let randomEventChance: number = 0;

            do {
                randomEventNumber = Math.floor(Math.random() * this.eventsMaxCount);
                randomEventChance = Math.floor(Math.random() * 100);
            } while(randomEventChance >= GameEvents[randomEventNumber].chance);
            // console.log("EVENT witch chance: ["+randomEventChance+"/"+GameEvents[randomEventNumber].chance+"] : "+ GameEvents[randomEventNumber].name);
            
            this.state.historyOfEvents.push(GameEvents[randomEventNumber]);
            this.setState({
                currentEvent: GameEvents[randomEventNumber],
                historyOfEvents: this.state.historyOfEvents
            });
            this.updateScroll();
            this.eventStep = Math.floor(Math.random() * 3) + 2;
        }
    }


    componentDidMount() {
        this.setState({currentEvent: initialGameEvent, historyOfEvents: []});

        this.eventStep = 0;
        this.eventsMaxCount = GameEvents.length;
        this.timer = setInterval( () => this.callForEvent(), 1000);
    }


    componentWillUnmount() {
        this.eventStep = 0;
        this.eventsMaxCount = 0;
        clearInterval(this.timer);
    }


    updateScroll() {
        var element = document.getElementById("eventsHistory");
        if (element)
            element.scrollTop = element.scrollHeight;
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
                                saveGameState(this.props.stats)
                                this.props.gotoMainMenu()
                            } }
                        />
                        <span className="maingame-title">FURY ROAD</span>
                    </div>
                    <div className="main-view-container">
                        <div className="main-view-left">
                            <div className="statistics-panel">
                                <span> FUEL { this.props.stats.fuel }</span>
                                <span> WATER { this.props.stats.water}</span>
                            </div>
                            <MainMenuButton
                                title="+ 10 FUEL"
                                active={ true }
                                onClick={ () => this.props.modStat({attribute: GameStatsEnum.FUEL, value: 10}) }
                            />
                            <MainMenuButton
                                title="- 10 FUEL"
                                active={ true }
                                onClick={ () => this.props.modStat({attribute: GameStatsEnum.FUEL, value: -10}) }
                            />
                            <MainMenuButton
                                title="+ 10 WATER"
                                active={ true }
                                onClick={ () => this.props.modStat({attribute: GameStatsEnum.WATER, value: 10}) }
                            />
                            <MainMenuButton
                                title="- 10 WATER"
                                active={ true }
                                onClick={ () => this.props.modStat({attribute: GameStatsEnum.WATER, value: -10}) }
                            />
                        </div>
                        <div className="main-view-middle">
                            <div className="events-panel">
                                <span>Wydażenia:</span>
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
    stats: getGameStats(state)
});


const mapDispatchToProps = (dispatch:any) => ({
    gotoMainMenu: () => dispatch(goToMainMenu()),
    modStat: (stat: StatToModify) => dispatch(modStat(stat)),
});


export default connect(mapStateToProps, mapDispatchToProps)(MainGame);
