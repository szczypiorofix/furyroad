import { IGameSettings } from "furyroad-interfaces";
import { Reducer } from "redux";
import { GameSettingsAction, GameSettingsActions } from "../actions";

const gameSettingsReducer: Reducer<IGameSettings, GameSettingsAction> = (
  state: IGameSettings = { musicOn: false, musicVolume: 50, canContinue: false, offline: true },
  action: GameSettingsAction,
): IGameSettings => {
  switch (action.type) {
    case GameSettingsActions.MUSIC_TOGGLE:
      return { ...state, musicOn: action.payload };
    case GameSettingsActions.CONTINUE_GAME_TOGGLE:
      return { ...state, canContinue: action.payload };
    case GameSettingsActions.SET_MUSIC_VOLUME:
      return { ...state, musicVolume: action.payload };
    case GameSettingsActions.SET_OFFLINE:
      return { ...state, offline: action.payload };
    default:
      return state;
  }
};

export default gameSettingsReducer;
