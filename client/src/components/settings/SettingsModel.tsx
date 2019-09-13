import { IGameSettings, ISavedState } from "furyroad-interfaces";
import { IMainMenuState } from "../../models";

export interface ISettingsProps {
  gameMode: IMainMenuState;
  gameSettings: IGameSettings;
  savedState: ISavedState;

  gotoMainMenu: () => void;
  toggleMusic: (v: boolean) => void;
  resetSavedState: (state: ISavedState) => void;
  toggleContinueGame: (v: boolean) => void;
  setMusicVolume: (v: number) => void;
}
