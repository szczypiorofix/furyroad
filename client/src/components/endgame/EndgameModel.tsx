import { IGameSettings, IGameStats, ISavedState } from "furyroad-interfaces";
import { IMainMenuState } from "../../models";

export interface IEndGameProps {
  mainState: IMainMenuState;
  stats: IGameStats;
  gameSettings: IGameSettings;

  gotoMainMenu: () => void;
  toggleContinueGame: (v: boolean) => void;
  resetSavedState: (state: ISavedState) => void;
}
