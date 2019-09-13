import React from "react";
import { connect } from "react-redux";

import Endgame from "../endgame/Endgame";
import Junkyard from "../junkyard/Junkyard";
import MainGame from "../maingame/MainGame";
import MainMenu from "../mainmenu/MainMenu";
import MusicBox from "../musicbox/MusicBox";
import Settings from "../settings/Settings";
import SplashScreen from "../splashscreen/SplashScreen";

import { IGameRootState, MainGameStateTypes } from "../../models";
import { getGameMode, getGameSettings } from "../../redux/selectors";
import { IGameProps } from "./GameModel";

export class Game extends React.Component<IGameProps, {}> {
  public render(): JSX.Element {
    switch (this.props.gameMode.mode) {
      case MainGameStateTypes.MAIN_MENU:
        return (
          <React.Fragment>
            <MusicBox />
            <MainMenu />
          </React.Fragment>
        );
      case MainGameStateTypes.NEW_GAME:
        return (
          <React.Fragment>
            <MusicBox />
            <MainGame />
          </React.Fragment>
        );
      case MainGameStateTypes.JUNKYARD:
        return (
          <React.Fragment>
            <MusicBox />
            <Junkyard />
          </React.Fragment>
        );
      case MainGameStateTypes.SETTINGS:
        return (
          <React.Fragment>
            <MusicBox />
            <Settings />
          </React.Fragment>
        );
      case MainGameStateTypes.CONTINUE:
        return (
          <React.Fragment>
            <MusicBox />
            <MainGame />
          </React.Fragment>
        );
      case MainGameStateTypes.ENDGAME:
        return (
          <React.Fragment>
            <MusicBox />
            <Endgame />
          </React.Fragment>
        );
      default:
        return <SplashScreen />;
    }
  }
}

const mapStateToProps = (state: IGameRootState) => ({
  gameMode: getGameMode(state),
  gameSettings: getGameSettings(state),
});

const mapDispatchToProps = (dispatch: any) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Game);
