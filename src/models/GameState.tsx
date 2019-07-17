
export enum MainGameStateTypes {
    MAIN_MENU = "MAIN_MENU",
    CONTINUE = "CONTINUE",
    NEW_GAME = "NEW_GAME",
    SETTINGS = "SETTINGS",
    JUNKYARD = "JUNKYARD",
    ENDGAME = "ENDGAME"
}

export enum GameStatsEnum {
    FUEL="fuel", WATER="water", FOOD="food"
}

export interface GameStats {
    [key: string]: number,
    fuel: number,
    water: number,
    food: number
}

export interface StatToModify {
    attribute: string,
    value: number
}

export interface MainMenuState {
    mode: MainGameStateTypes
}

export interface GameRootState {
    mainmenustate: MainMenuState;
    gamestats: GameStats;
}
