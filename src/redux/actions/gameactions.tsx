import { action } from 'typesafe-actions'

import { StatToModify, GameStats } from '../../models';



export enum GameMode {
    GAME_MODSTAT  = "MOD_STAT",
    GAME_RESETSTAT = "RESET_STATS"
}

export interface GameModStat {
    readonly type: GameMode.GAME_MODSTAT;
    payload: StatToModify
}

export interface ResetGameStats {
    readonly type: GameMode.GAME_RESETSTAT;
}


export type GameModeAction = GameModStat | ResetGameStats;

export const modStat = (stat:StatToModify) => action(GameMode.GAME_MODSTAT, stat);

export const resetStatsToValue = (initial: GameStats) => action(GameMode.GAME_RESETSTAT, initial)
