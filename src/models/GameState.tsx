
export enum MainGameStateTypes {
    MAIN_MENU = "MAIN_MENU",
    CONTINUE = "CONTINUE",
    NEW_GAME = "NEW_GAME",
    SETTINGS = "SETTINGS",
    JUNKYARD = "JUNKYARD",
    ENDGAME = "ENDGAME"
}

export interface GameStats {
    fuel: number,
    water: number,
}

export interface MainMenuState {
    mode: MainGameStateTypes
}

export interface GameRootState {
    mainmenustate: MainMenuState;
    gamestats: GameStats;
}
