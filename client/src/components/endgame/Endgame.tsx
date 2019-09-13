import React from "react";
import { connect } from "react-redux";

import "./Endgame.scss";

import { ISavedState } from "furyroad-interfaces";
import { IGameRootState } from "../../models";
import { goToMainMenu, resetSavedState, toggleContinueGame } from "../../redux/actions";
import initialState from "../../redux/initialstate";
import { getGameMode, getGameSettings, getGameStats } from "../../redux/selectors";
import { MainMenuButton } from "../mainmenubutton/MainMenuButton";
import { IEndGameProps } from "./EndgameModel";

export class Endgame extends React.Component<IEndGameProps, {}> {
  public componentDidMount() {
    console.log(this.props);
    if (this.props.gameSettings.canContinue) {
      console.log("Can continue");
      this.props.toggleContinueGame(false);
    }
  }

  public render(): JSX.Element {
    const distanceState: string = "Przejechałeś dystans " + this.props.stats.distanceDriven.toFixed(2) + " km.";
    const fuelState: string =
      this.props.stats.fuel <= 0
        ? "Skończyło ci się paliwo."
        : "Zostało ci " + this.props.stats.fuel.toFixed(2) + " L paliwa.";
    const waterState: string =
      this.props.stats.water <= 0
        ? "Skończyła ci się woda pitna."
        : "Zostało ci " + this.props.stats.water.toFixed(2) + " jednostek wody.";
    const foodState: string =
      this.props.stats.food <= 0
        ? "Skończyło ci się pożywienie."
        : "Zostało ci " + this.props.stats.food.toFixed(2) + " jednostek pożywienia.";
    const carHealthState: string =
      "Stan techniczny: " + this.props.stats.carHealth + "/" + this.props.stats.carMaxHealth;

    return (
      <React.Fragment>
        <div className="endgame-div">
          <MainMenuButton
            title="MENU GŁÓWNE"
            active={true}
            onClick={() => {
              this.props.resetSavedState(initialState.savedstate);
              this.props.gotoMainMenu();
            }}
          />
          <h1>KONIEC GRY !!!</h1>
          <p>{distanceState}</p>
          <p>{fuelState}</p>
          <p>{waterState}</p>
          <p>{foodState}</p>
          <h2>Interceptor:</h2>
          <p>{carHealthState}</p>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: IGameRootState) => ({
  mainState: getGameMode(state),
  stats: getGameStats(state),
  gameSettings: getGameSettings(state),
});

const mapDispatchToProps = (dispatch: any) => ({
  gotoMainMenu: () => dispatch(goToMainMenu()),
  resetSavedState: (state: ISavedState) => dispatch(resetSavedState(state)),
  toggleContinueGame: (v: boolean) => dispatch(toggleContinueGame(v)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Endgame);
