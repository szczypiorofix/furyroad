import { IGameStats, ISavedState } from "furyroad-interfaces";

export enum MainGameStateTypes {
  MAIN_MENU = "MAIN_MENU",
  CONTINUE = "CONTINUE",
  NEW_GAME = "NEW_GAME",
  SETTINGS = "SETTINGS",
  JUNKYARD = "JUNKYARD",
  ENDGAME = "ENDGAME",
  SPLASHSCREEN = "SPLASHSCREEN",
}

export interface IMainMenuState {
  mode: MainGameStateTypes;
}

export interface IGameRootState {
  mainmenustate: IMainMenuState;
  savedstate: ISavedState;
}

export interface IUser {
  email: string;
  password: string;
  uuid: string;
  stats: IGameStats;
}
