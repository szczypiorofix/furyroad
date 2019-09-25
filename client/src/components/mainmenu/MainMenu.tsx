import React from "react";
import { connect } from "react-redux";

import { IGameLogin, ISavedState } from "furyroad-interfaces";
import { IGameRootState } from "../../models";
import {
  continueGame,
  goToJunkyard,
  goToNewGame,
  goToSettings,
  goToSplashScreen,
  logout,
  resetSavedState,
  toggleContinueGame,
} from "../../redux/actions";
import initialState from "../../redux/initialstate";
import { getGameMode, getGameSettings, getLogin } from "../../redux/selectors";
import { MainMenuButton } from "../mainmenubutton/MainMenuButton";
import "./MainMenu.scss";
import { IMainMenuProps } from "./MainMenuModel";

export class MainMenu extends React.Component<IMainMenuProps, {}> {
  public render(): JSX.Element {
    return (
      <React.Fragment>
        <div className="mainmenu-bg">
          <div className="mainmenu-content">
            <div className="login-part">
              <button onClick={() => this.props.gotoSplashScreen()}>{this.props.getLogin.email} | Wyjdź</button>
            </div>
            <h1 className="mainmenu-gametitle">FURY ROAD</h1>
            <div className="buttons-div">
              <MainMenuButton
                title="Kontynuuj"
                active={this.props.gameSettings.canContinue}
                onClick={() => this.props.continueGame()}
              />
              <MainMenuButton
                title="Nowa gra"
                active={true}
                onClick={() => {
                  this.props.resetSavedState(initialState.savedstate);
                  this.props.startNewGame();
                }}
              />
              <MainMenuButton title="Śmietnisko" active={true} onClick={() => this.props.gotoJunkyard()} />
              <MainMenuButton title="Ustawienia" active={true} onClick={() => this.props.gotoSettings()} />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: IGameRootState) => ({
  gameMode: getGameMode(state),
  gameSettings: getGameSettings(state),
  getLogin: getLogin(state),
});

const mapDispatchToProps = (dispatch: any) => ({
  startNewGame: () => dispatch(goToNewGame()),
  gotoJunkyard: () => dispatch(goToJunkyard()),
  gotoSettings: () => dispatch(goToSettings()),
  continueGame: () => dispatch(continueGame()),
  toggleContinueGame: (v: boolean) => dispatch(toggleContinueGame(v)),
  gotoSplashScreen: () => dispatch(goToSplashScreen()),
  logout: (gameLogin: IGameLogin) => dispatch(logout(gameLogin)),
  resetSavedState: (initial: ISavedState) => dispatch(resetSavedState(initial)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MainMenu);
