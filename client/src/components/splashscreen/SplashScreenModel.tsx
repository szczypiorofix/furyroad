import { IGameLogin, IGameSettings, IResponseType, ISavedState, IUser } from "furyroad-interfaces";

export interface ISplashScreenProps {
  gotoMainMenu: () => void;
  login: (user: IUser) => void;
  logout: (gameLogin: IGameLogin) => void;
  setOffline: (v: boolean) => void;
  resetSavedState: (initial: ISavedState) => void;
  loadSavedState: (initial: ISavedState) => void;
  toggleContinueGame: (v: boolean) => void;

  getLogin: IGameLogin;
  getSettings: IGameSettings;
}

export interface IChangeLogContent {
  _id: string;
  date: number;
  text: string;
}

export interface ISplashScreenState {
  loginPopupVisible: boolean;
  registerPopupVisible: boolean;
  registerPasswordsMatch: boolean;
  changeLogVisible: boolean;
  changeLogContent: IResponseType;
  changeLogContentLoading: boolean;
}
