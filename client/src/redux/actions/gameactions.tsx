import { action } from "typesafe-actions";

import { ISavedState, IStatToModify } from "furyroad-interfaces";

export enum GameStatsActions {
  GAME_MODSTAT = "MOD_STAT",
  GAME_SETSTAT = "SET_STAT",
  GAME_RESETSTATS = "RESET_STATS",
  GAME_LOADSTATS = "LOAD_STATS",
}

export interface IGameStatsActionModStat {
  readonly type: GameStatsActions.GAME_MODSTAT;
  payload: IStatToModify;
}

export interface IGameStatsActionSetStat {
  readonly type: GameStatsActions.GAME_SETSTAT;
  payload: IStatToModify;
}

export interface IGameStatsActionResetStat {
  readonly type: GameStatsActions.GAME_RESETSTATS;
}

export interface IGameStatsActionLoadStats {
  readonly type: GameStatsActions.GAME_LOADSTATS;
  payload: ISavedState;
}

export type GameStatsAction =
  | IGameStatsActionModStat
  | IGameStatsActionSetStat
  | IGameStatsActionResetStat
  | IGameStatsActionLoadStats;

export const modStat = (stat: IStatToModify) => action(GameStatsActions.GAME_MODSTAT, stat);

export const setStat = (stat: IStatToModify) => action(GameStatsActions.GAME_SETSTAT, stat);

export const resetSavedState = (initial: ISavedState) => action(GameStatsActions.GAME_RESETSTATS, initial);

export const loadSavedState = (initial: ISavedState) => action(GameStatsActions.GAME_LOADSTATS, initial);
