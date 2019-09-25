import React from "react";
import { connect } from "react-redux";

import "./MainGame.scss";

import {
  EventResults,
  EventTypes,
  GameStatsEnum,
  IGameEvent,
  IResponseType,
  ISavedState,
  IStatToModify,
} from "furyroad-interfaces";
import { IGameRootState } from "../../models";
import { goToEndGame, goToMainMenu, modStat, resetSavedState, setStat, toggleContinueGame } from "../../redux/actions";
import { getGameEvents, getGameMode, getGameSettings, getGameStats, getLogin } from "../../redux/selectors";
import { LOCAL_STORAGE_SAVED_STATE_NAME } from "../../redux/store";
import { MainMenuButton } from "../mainmenubutton/MainMenuButton";
import { GameEvents, historyEventsMaxList, initialGameEvent } from "./gameevents/GameEvents";
import { IMainGameProps, IMainGameState } from "./MainGameModel";
import GameMap from "./map/GameMap";

export class MainGame extends React.Component<IMainGameProps, IMainGameState> {
  private timer: any;
  private eventsMaxCount: number = 0;
  private eventStep: number = 0;

  public yesButtonChosen = () => {
    switch (this.state.currentEvent.type) {
      case EventTypes.FIGHT:
        if (this.state.currentEvent.attackRate > this.props.stats.defenseRate) {
          console.log(
            this.state.currentEvent.name +
              ": " +
              this.state.currentEvent.attackRate +
              " vs. " +
              this.props.stats.defenseRate,
          );
          console.log("Walczyłeś i przegrałeś");

          let looseCarHealthAmount: number = 0;
          let looseFuelAmount: number = 0;

          for (let i: number = 0; i < this.state.currentEvent.result.fail.length; i++) {
            switch (this.state.currentEvent.result.fail[i].res) {
              case EventResults.LOOSE_CAR_HEALTH:
                const looseCarHealthFactor: number = this.state.currentEvent.result.fail[i].value;
                console.log("Wylosowano carHealth: " + looseCarHealthFactor);
                this.props.modStat({ attribute: GameStatsEnum.CARHEALTH, value: looseCarHealthFactor });
                looseCarHealthAmount += looseCarHealthFactor;
                break;
              case EventResults.LOOSE_FUEL:
                const looseFuelFactor: number = this.state.currentEvent.result.fail[i].value;
                console.log("Wylosowano fuel: " + looseFuelFactor);
                this.props.modStat({ attribute: GameStatsEnum.FUEL, value: looseFuelFactor });
                looseFuelAmount += looseFuelFactor;
                break;
              default:
                break;
            }
          }

          let failEvent: IGameEvent;
          failEvent = {
            chance: 100,
            attackRate: 0,
            defenseRate: 0,
            name: "Przegrałeś !!!",
            text:
              (looseCarHealthAmount < 0 ? "Uszkodziłeś samochód: " + -looseCarHealthAmount + ". " : "") +
              (looseFuelAmount < 0 ? "Tracisz " + -looseFuelAmount + " paliwa." : ""),
            options: { yesbutton: "", nobutton: "" },
            result: { succ: [], fail: [] },
            type: EventTypes.INFO,
          };

          if (this.state.historyOfEvents.length > historyEventsMaxList) {
            this.state.historyOfEvents.shift();
          }
          this.state.historyOfEvents.push(failEvent);
          this.setState({
            currentEvent: GameEvents[this.state.drawnEventNumber],
            historyOfEvents: this.state.historyOfEvents,
          });
        } else {
          console.log(
            this.state.currentEvent.name +
              ": " +
              this.state.currentEvent.attackRate +
              " vs. " +
              this.props.stats.defenseRate,
          );
          console.log("Wygrałeś !!");

          for (let i: number = 0; i < GameEvents[this.state.drawnEventNumber].result.succ.length; i++) {
            switch (GameEvents[this.state.drawnEventNumber].result.succ[i].res) {
              case EventResults.FOUND_FOOD:
                this.props.modStat({
                  attribute: GameStatsEnum.FOOD,
                  value: GameEvents[this.state.drawnEventNumber].result.succ[i].value,
                });
                break;
              case EventResults.FOUND_FUEL:
                this.props.modStat({
                  attribute: GameStatsEnum.FUEL,
                  value: GameEvents[this.state.drawnEventNumber].result.succ[i].value,
                });
                break;
              case EventResults.FOUND_SCRAP:
                this.props.modStat({
                  attribute: GameStatsEnum.SCRAP,
                  value: GameEvents[this.state.drawnEventNumber].result.succ[i].value,
                });
                break;
              case EventResults.FOUND_WATER:
                this.props.modStat({
                  attribute: GameStatsEnum.FOOD,
                  value: GameEvents[this.state.drawnEventNumber].result.succ[i].value,
                });
                break;
              default:
                break;
            }
          }

          let fleeEvent: IGameEvent;
          fleeEvent = {
            chance: 100,
            attackRate: 0,
            defenseRate: 0,
            name: "Wygrałeś !!!",
            text: "Wygrałeś z wrogiem: " + this.state.currentEvent.name,
            options: { yesbutton: "", nobutton: "" },
            result: { succ: [], fail: [] },
            type: EventTypes.INFO,
          };

          if (this.state.historyOfEvents.length > historyEventsMaxList) {
            this.state.historyOfEvents.shift();
          }
          this.state.historyOfEvents.push(fleeEvent);

          this.setState({
            currentEvent: GameEvents[this.state.drawnEventNumber],
            historyOfEvents: this.state.historyOfEvents,
          });
        }
        break;
      case EventTypes.ENCOUNTER:
        break;
      case EventTypes.VILLAGE:
        break;
      default:
        break;
    }

    this.setState({ ...this.state, paused: false, drawnEventNumber: -1 });

    this.updateScroll();
  };

  public noButtonChosen = () => {
    this.setState({ ...this.state, paused: false, drawnEventNumber: -1 });
    if (this.state.currentEvent.type === EventTypes.FIGHT) {
      // for (let i:number = 0; i < GameEvents[this.state.drawnEventNumber].result.succ.length; i++) {
      //     switch(GameEvents[this.state.drawnEventNumber].result.succ[i].res) {
      //         case EventResults.FOUND_FOOD:
      //             this.props.modStat({attribute: GameStatsEnum.FOOD, value: GameEvents[this.state.drawnEventNumber].result.succ[i].value});
      //             break;
      //         case EventResults.FOUND_FUEL:
      //             this.props.modStat({attribute: GameStatsEnum.FUEL, value: GameEvents[this.state.drawnEventNumber].result.succ[i].value});
      //             break;
      //         case EventResults.FOUND_SCRAP:
      //             this.props.modStat({attribute: GameStatsEnum.SCRAP, value: GameEvents[this.state.drawnEventNumber].result.succ[i].value});
      //             break;
      //         case EventResults.FOUND_WATER:
      //             this.props.modStat({attribute: GameStatsEnum.FOOD, value: GameEvents[this.state.drawnEventNumber].result.succ[i].value});
      //             break;
      //         default:
      //             break;
      //     }
      // }
      // let fleeEvent:GameEvent;
      // fleeEvent = {
      //     chance: 100,
      //     attackRate: 0,
      //     defenseRate: 0,
      //     name: "Uciekasz !!!",
      //     text: "Tracisz  " + this.state.currentEvent.name,
      //     options: { yesbutton: "", nobutton: ""},
      //     result: { succ: [], fail: [] },
      //     type: EventTypes.INFO
      // }
      // if (this.state.historyOfEvents.length > historyEventsMaxList) {
      //     this.state.historyOfEvents.shift();
      // }
      // this.state.historyOfEvents.push(fleeEvent);
      // this.setState({
      //     currentEvent: GameEvents[this.state.drawnEventNumber],
      //     historyOfEvents: this.state.historyOfEvents
      // });
    }

    this.updateScroll();
  };

  public callForEvent() {
    // Paused
    if (!this.state.paused) {
      // Unpaused
      this.eventStep--;

      if (this.eventStep <= 0) {
        let randomEventChance: number = 0;

        do {
          this.setState({ ...this.state, drawnEventNumber: Math.floor(Math.random() * this.eventsMaxCount) });
          randomEventChance = Math.floor(Math.random() * 100);
        } while (randomEventChance >= GameEvents[this.state.drawnEventNumber].chance);

        if (this.state.historyOfEvents.length > historyEventsMaxList) {
          this.state.historyOfEvents.shift();
        }

        this.state.historyOfEvents.push(GameEvents[this.state.drawnEventNumber]);
        this.setState({
          currentEvent: GameEvents[this.state.drawnEventNumber],
          historyOfEvents: this.state.historyOfEvents,
        });

        this.updateScroll();
        this.eventStep = Math.floor(Math.random() * 3) + 2;

        if (GameEvents[this.state.drawnEventNumber].type !== EventTypes.TERRAIN) {
          this.setState({ ...this.state, paused: true });
        }
      }

      // ZUŻYCIE PALIWA:
      this.props.modStat({ attribute: GameStatsEnum.FUEL, value: -this.props.stats.carFuelUsage });

      // ZUŻYCIE JEDZENIA:
      this.props.modStat({ attribute: GameStatsEnum.FOOD, value: -0.25 });

      // ZUŻYCIE WODY:
      this.props.modStat({ attribute: GameStatsEnum.WATER, value: -0.25 });

      // OBSŁUGA TEMPERATURY
      if (this.props.stats.carTemperature < 90) {
        this.props.modStat({ attribute: GameStatsEnum.CARTEMPERATURE, value: 2 });
      }

      // OBLICACZNIE DYSTANSU
      this.props.modStat({ attribute: GameStatsEnum.DISTANCEDRIVEN, value: this.props.stats.carSpeed / 3600 });

      if (
        this.props.stats.fuel <= 0 ||
        this.props.stats.carHealth <= 0 ||
        this.props.stats.food <= 0 ||
        this.props.stats.water <= 0
      ) {
        localStorage.removeItem(LOCAL_STORAGE_SAVED_STATE_NAME);
        this.props.goToEndGame();
      }
    }
  }

  public componentDidMount() {
    this.setState({
      currentEvent: initialGameEvent,
      historyOfEvents: this.props.getGameEvents,
      paused: false,
      drawnEventNumber: -1,
    });

    this.eventStep = 0;
    this.eventsMaxCount = GameEvents.length;
    this.timer = setInterval(() => this.callForEvent(), 1000);
  }

  public componentWillUnmount() {
    this.eventStep = 0;
    this.eventsMaxCount = 0;
    clearInterval(this.timer);
  }

  // Update the events panel to the bottom
  public updateScroll() {
    const element = document.getElementById("eventsHistory");
    if (element) {
      element.scrollTop = element.scrollHeight;
    }
  }

  // WARNINGS !!!
  // public componentWillReceiveProps(nextProps: IMainGameProps) {
  //   if (nextProps.getGameEvents !== this.props.getGameEvents) {
  //     this.setState({ historyOfEvents: nextProps.getGameEvents });
  //   }
  // }

  public render(): JSX.Element {
    if (this.state) {
      return (
        <React.Fragment>
          <div className="main-game-div">
            <div className="main-game-header">
              <MainMenuButton
                title="ZAPIS I WYJŚCIE"
                active={true}
                onClick={() => {
                  fetch("/api/users", {
                    method: "PUT",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      email: this.props.getLogin.email,
                      uuid: this.props.getLogin.uuid,
                      stats: this.props.stats,
                    }),
                  })
                    .then(res => res.json())
                    .then((resp: IResponseType) => {
                      console.log(resp);
                    });
                  this.props.toggleContinueGame(true);
                  this.props.gotoMainMenu();
                }}
              />
              <span className="maingame-title">FURY ROAD</span>
              <div className="imageFuel">
                <div
                  className="imageFuelIndicator"
                  style={{
                    transform:
                      "rotate(" + Math.floor((this.props.stats.fuel * 180) / this.props.stats.maxFuel - 90) + "deg)",
                  }}
                ></div>
              </div>
              <div className="imageCarTemperature">
                <div
                  className="imageCarTemperatureIndicator"
                  style={{
                    transform:
                      "rotate(" +
                      ((this.props.stats.carTemperature * 180) / this.props.stats.carMaxTemperature - 90) +
                      "deg)",
                  }}
                ></div>
              </div>
            </div>

            <GameMap />

            <div className="main-view-container">
              <div className="main-view-left">
                <span>STATYSTYKI:</span>
                <div className="statistics-panel">
                  <div className="stats-part">
                    <span> DYSTANS :</span>
                    <span> {this.props.stats.distanceDriven.toFixed(3)} km</span>
                  </div>
                  <div className="stats-part">
                    <span> PRĘDKOŚĆ :</span>
                    <span> {this.props.stats.carSpeed.toFixed(2)} km/h</span>
                  </div>
                  <div className="stats-part">
                    <span> PALIWO :</span>
                    <span> {this.props.stats.fuel.toFixed(2)} L</span>
                  </div>
                  <div className="stats-part">
                    <span> WODA :</span>
                    <span> {this.props.stats.water.toFixed(2)}</span>
                  </div>
                  <div className="stats-part">
                    <span> ŻYWNOŚĆ :</span>
                    <span> {this.props.stats.food.toFixed(2)}</span>
                  </div>
                  <div className="stats-part">
                    <span> ZŁOM :</span>
                    <span> {this.props.stats.scrap}</span>
                  </div>
                  <div className="stats-part">
                    <span> AUTO :</span>
                    <span>
                      {" "}
                      {this.props.stats.carHealth} / {this.props.stats.carMaxHealth}
                    </span>
                  </div>
                  <div className="stats-part">
                    <span> TEMPERATURA :</span>
                    <span> {this.props.stats.carTemperature} &#x2103;</span>
                  </div>
                  <div className="stats-part">
                    <span> ATAK :</span>
                    <span> {this.props.stats.attactRate} </span>
                  </div>
                  <div className="stats-part">
                    <span> OBRONA :</span>
                    <span> {this.props.stats.defenseRate} </span>
                  </div>
                </div>
                <MainMenuButton title="<HACK> ENDGAME" active={true} onClick={() => this.props.goToEndGame()} />
              </div>
              <div className="main-view-middle">
                <div className="events-panel">
                  <span>Wydarzenia:</span>
                  <div className="history-events-container">
                    <ul id="eventsHistory" className="history-events">
                      {this.state.historyOfEvents.map((item: IGameEvent, i: number) => {
                        return (
                          <li key={i}>
                            {item.name} {item.text}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </div>

                <div className="events-button-div">
                  <MainMenuButton
                    title={
                      this.state.drawnEventNumber >= 4 ? GameEvents[this.state.drawnEventNumber].options.yesbutton : ""
                    }
                    active={this.state.drawnEventNumber >= 4}
                    onClick={this.yesButtonChosen}
                  />

                  <MainMenuButton
                    title={
                      this.state.drawnEventNumber >= 4 ? GameEvents[this.state.drawnEventNumber].options.nobutton : ""
                    }
                    active={this.state.drawnEventNumber >= 4}
                    onClick={this.noButtonChosen}
                  />
                </div>
              </div>
              <div className="main-view-right">
                <div className="upgrades-panel">
                  <span>Upgrades:</span>
                </div>
                <div className="map-button-panel">
                  <MainMenuButton
                    title={"Mapa"}
                    active={true}
                    onClick={() => {
                      console.log("MAPA");
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </React.Fragment>
      );
    } else {
      return <div>...</div>;
    }
  }
}

const mapStateToProps = (state: IGameRootState) => ({
  mainState: getGameMode(state),
  stats: getGameStats(state),
  getGameEvents: getGameEvents(state),
  gameSettings: getGameSettings(state),
  getLogin: getLogin(state),
});

const mapDispatchToProps = (dispatch: any) => ({
  gotoMainMenu: () => dispatch(goToMainMenu()),
  goToEndGame: () => dispatch(goToEndGame()),
  modStat: (stat: IStatToModify) => dispatch(modStat(stat)),
  setStat: (stat: IStatToModify) => dispatch(setStat(stat)),
  toggleContinueGame: (v: boolean) => dispatch(toggleContinueGame(v)),
  resetSavedState: (initial: ISavedState) => dispatch(resetSavedState(initial)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MainGame);
