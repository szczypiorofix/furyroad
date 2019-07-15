
export enum GameStateTypes {
    MAIN_MENU,
    CONTINUE,
    NEW_GAME,
    SETTINGS,
    JUNKYARD,
    ENDGAME
}

export interface GameStats {
    fuel: number,
    water: number,
}

export interface GameState {
    // [key: string]: any,
    mode: GameStateTypes,
    stats: GameStats
}