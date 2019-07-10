
export enum GameStateTypes {
    MAIN_MENU,
    CONTINUE,
    NEW_GAME,
    SETTINGS,
    JUNKYARD,
    ENDGAME
}

export interface GameState {
    // mode: 'main_menu' | 'continue' | 'new_game' | 'settings' | 'junkyard' | 'endgame'
    mode: GameStateTypes
}