
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
    fuelConsumption: number,
    currentSpeed: number,
    distance: number,
    carHealth: number,
    carMaxHealth: number,
    carAttactRatio: number,
    carShields: number,
    food: number,
    water: number,
    scrap: number
}

export interface GameState {
    mode: GameStateTypes,
    stats: GameStats
}