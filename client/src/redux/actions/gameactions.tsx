import { action } from 'typesafe-actions'

import { StatToModify } from '../../models';
import { SavedState } from '../../models';



export enum GameStatsActions {
    GAME_MODSTAT  = "MOD_STAT",
    GAME_SETSTAT  = "SET_STAT",
    GAME_RESETSTATS = "RESET_STATS",
}

export interface GameStatsActionModStat {
    readonly type: GameStatsActions.GAME_MODSTAT;
    payload: StatToModify
}

export interface GameStatsActionSetStat {
    readonly type: GameStatsActions.GAME_SETSTAT;
    payload: StatToModify
}

export interface GameStatsActionResetStat {
    readonly type: GameStatsActions.GAME_RESETSTATS;
}


export type GameStatsAction = GameStatsActionModStat | GameStatsActionSetStat | GameStatsActionResetStat;

export const modStat = (stat:StatToModify) => action(GameStatsActions.GAME_MODSTAT, stat);

export const setStat = (stat:StatToModify) => action(GameStatsActions.GAME_SETSTAT, stat);

export const resetSavedState = (initial: SavedState) => action(GameStatsActions.GAME_RESETSTATS, initial)
