import { action } from 'typesafe-actions'

import { StatToModify } from '../../models';
import { SavedState } from '../../models';



export enum GameMode {
    GAME_MODSTAT  = "MOD_STAT",
    GAME_SETSTAT  = "SET_STAT",
    GAME_RESETSTAT = "RESET_STATS"
}

export interface ModGameStat {
    readonly type: GameMode.GAME_MODSTAT;
    payload: StatToModify
}

export interface SetGameStat {
    readonly type: GameMode.GAME_SETSTAT;
    payload: StatToModify
}

export interface ResetGameStats {
    readonly type: GameMode.GAME_RESETSTAT;
}


export type GameModeAction = ModGameStat | SetGameStat | ResetGameStats;

export const modStat = (stat:StatToModify) => action(GameMode.GAME_MODSTAT, stat);

export const setStat = (stat:StatToModify) => action(GameMode.GAME_SETSTAT, stat);

export const resetSavedState = (initial: SavedState) => action(GameMode.GAME_RESETSTAT, initial)
