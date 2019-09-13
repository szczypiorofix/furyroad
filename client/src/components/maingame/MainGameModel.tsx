import { IGameEvent, IGameLogin, IGameSettings, IGameStats, ISavedState, IStatToModify } from "furyroad-interfaces";
import { IMainMenuState } from "../../models";

export interface IMainGameState {
  paused: boolean;
  drawnEventNumber: number;
  currentEvent: IGameEvent;
  historyOfEvents: IGameEvent[];
}

export interface IMainGameProps {
  mainState: IMainMenuState;
  stats: IGameStats;
  getGameEvents: IGameEvent[];
  gameSettings: IGameSettings;
  getLogin: IGameLogin;

  gotoMainMenu: () => void;
  goToEndGame: () => void;
  modStat: (stat: IStatToModify) => void;
  setStat: (stat: IStatToModify) => void;
  toggleContinueGame: (v: boolean) => void;
  resetSavedState: (initial: ISavedState) => void;
}
