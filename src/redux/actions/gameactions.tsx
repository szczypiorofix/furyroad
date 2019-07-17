import { action } from 'typesafe-actions'

import { StatToModify } from '../../models';


export enum GameMode {
    GAME_MODSTAT  = "MOD_STAT",
}

export interface GameModStat {
    readonly type: GameMode.GAME_MODSTAT;
    payload: StatToModify
}

export type GameModeAction = GameModStat;

export const modStat = (stat:StatToModify) => action(GameMode.GAME_MODSTAT, stat);
