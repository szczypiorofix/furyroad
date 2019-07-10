import { action } from 'typesafe-actions'

export enum GameActions {
    START_NEW_GAME = 'NEW_GAME',
    CONTINUE = 'CONTINUE_GAME',
    SETTINGS = 'SETTING_MENU',
    JUNKYARD = 'JUNKYARD_MENU',
    MAIN_MENU = 'MAIN_MENU',
    END_GAME = 'END_GAME'
};

export interface StartNewGame {
    readonly type: GameActions.START_NEW_GAME;
}

export interface ContinueGame {
    readonly type: GameActions.CONTINUE;
}

export interface GoToSettings {
    readonly type: GameActions.SETTINGS;
}

export interface GoToJunkyard {
    readonly type: GameActions.JUNKYARD;
}

export interface GoToMainMenu {
    readonly type: GameActions.MAIN_MENU;
}

export interface EndGame {
    readonly type: GameActions.END_GAME;
}


export type GameAction = StartNewGame | ContinueGame | GoToSettings | GoToJunkyard | GoToMainMenu | EndGame;


export const startNewGame = () => action(GameActions.START_NEW_GAME, 0);
export const continueGame = () => action(GameActions.CONTINUE, 0);
export const goToSettings = () => action(GameActions.SETTINGS, 0);
export const goToJunkyard = () => action(GameActions.JUNKYARD, 0);
export const goToMainMenu = () => action(GameActions.MAIN_MENU, 0);
export const endGame      = () => action(GameActions.END_GAME, 0);
