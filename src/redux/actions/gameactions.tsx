import { action } from 'typesafe-actions'

export enum GameMode {
    GAME_MODFUEL  = "MOD_FUEL",
    GAME_MODWATER  = "MOD_WATER"
}

export interface GameModFuel {
    readonly type: GameMode.GAME_MODFUEL;
    readonly payload: number;
}

export interface GameModWater {
    readonly type: GameMode.GAME_MODWATER;
    readonly payload: number;
}


export type GameModeAction = GameModFuel | GameModWater;



export const modFuel = (amount: number) => action(GameMode.GAME_MODFUEL, amount);

export const modWater = (amount: number) => action(GameMode.GAME_MODWATER, amount);
