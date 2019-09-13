import { action } from "typesafe-actions";

export enum GameSettingsActions {
  MUSIC_TOGGLE = "MUSIC_TOGGLE",
  CONTINUE_GAME_TOGGLE = "CONTINUE_GAME_TOGGLE",
  SET_MUSIC_VOLUME = "SET_MUSIC_VOLUME",
  SET_OFFLINE = "SET_OFFLINE",
}

export interface IGameSettingsActionMusicToggle {
  readonly type: GameSettingsActions.MUSIC_TOGGLE;
  payload: boolean;
}

export interface IGameSettingsActionSetOffline {
  readonly type: GameSettingsActions.SET_OFFLINE;
  payload: boolean;
}

export interface IGameSettingsActionContinueGameToggle {
  readonly type: GameSettingsActions.CONTINUE_GAME_TOGGLE;
  payload: boolean;
}

export interface IGameSettingsActionSetMusicVolume {
  readonly type: GameSettingsActions.SET_MUSIC_VOLUME;
  payload: number;
}

export type GameSettingsAction =
  | IGameSettingsActionMusicToggle
  | IGameSettingsActionSetOffline
  | IGameSettingsActionContinueGameToggle
  | IGameSettingsActionSetMusicVolume;

export const toggleMusic = (v: boolean) => action(GameSettingsActions.MUSIC_TOGGLE, v);

export const toggleContinueGame = (v: boolean) => action(GameSettingsActions.CONTINUE_GAME_TOGGLE, v);

export const setMusicVolume = (v: number) => action(GameSettingsActions.SET_MUSIC_VOLUME, v);

export const setOffline = (v: boolean) => action(GameSettingsActions.SET_OFFLINE, v);
