import { IGameLogin, IGameSettings, ISavedState, IUser } from "furyroad-interfaces";
import { IMainMenuState } from "../../models";

export interface IMainMenuProps {
  gameMode: IMainMenuState;
  gameSettings: IGameSettings;
  getLogin: IGameLogin;

  startNewGame: () => void;
  gotoJunkyard: () => void;
  gotoSettings: () => void;
  continueGame: () => void;
  toggleContinueGame: (v: boolean) => void;
  gotoSplashScreen: () => void;

  logout: (gameLogin: IGameLogin) => void;

  resetSavedState: (initial: ISavedState) => void;
}
