import React from "react";
import { connect } from "react-redux";

import { ISavedState } from "furyroad-interfaces";
import { IGameRootState } from "../../models";
import { goToMainMenu, resetSavedState, setMusicVolume, toggleContinueGame, toggleMusic } from "../../redux/actions";
import initialState from "../../redux/initialstate";
import { getGameMode, getGameSettings, getSavedState } from "../../redux/selectors";
import { MainMenuButton } from "../mainmenubutton/MainMenuButton";
import "./Settings.scss";
import { ISettingsProps } from "./SettingsModel";

export class Settings extends React.Component<ISettingsProps, {}> {
  public toggleMusic() {
    this.props.toggleMusic(!this.props.gameSettings.musicOn);
  }

  public onVolumeChange(a: React.ChangeEvent<HTMLInputElement>) {
    this.props.setMusicVolume(+a.target.value);
  }

  public render(): JSX.Element {
    return (
      <React.Fragment>
        <div className="setting-menu">
          <MainMenuButton title="MENU GŁÓWNE" active={true} onClick={() => this.props.gotoMainMenu()} />
          <h2 className="settings-title">USTAWIENIA</h2>
          <div
            className={this.props.gameSettings.musicOn ? "musicicon on" : "musicicon off"}
            onClick={() => this.toggleMusic()}
          ></div>
          <div className="volume-control">
            <input
              type="range"
              name="points"
              min="0"
              max="100"
              value={this.props.gameSettings.musicVolume}
              onChange={(a: React.ChangeEvent<HTMLInputElement>) => this.onVolumeChange(a)}
            ></input>
          </div>
          <button
            className="resetAll"
            onClick={() => {
              this.props.resetSavedState(initialState.savedstate);
              this.props.toggleContinueGame(false);
            }}
          >
            RESET
          </button>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: IGameRootState) => ({
  gameMode: getGameMode(state),
  gameSettings: getGameSettings(state),
  savedState: getSavedState(state),
});

const mapDispatchToProps = (dispatch: any) => ({
  gotoMainMenu: () => dispatch(goToMainMenu()),
  toggleMusic: (v: boolean) => dispatch(toggleMusic(v)),
  resetSavedState: (state: ISavedState) => dispatch(resetSavedState(state)),
  toggleContinueGame: (v: boolean) => dispatch(toggleContinueGame(v)),
  setMusicVolume: (v: number) => dispatch(setMusicVolume(v)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Settings);
