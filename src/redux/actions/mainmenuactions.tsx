import { action } from 'typesafe-actions'


export enum MainMenuMode {
    MMM_CONTINUE    = "MMM_CONTINUE",
    MMM_NEWGAME     = "MMM_NEWGAME",
    MMM_SETTINGS    = "MMM_SETTINGS",
    MMM_JUNKYARD    = "MMM_JUNKYARD",
    MMM_MAINMENU    = "MMM_MAINMENU"
}

export interface MainMenuModeNewGame {
    readonly type: MainMenuMode.MMM_NEWGAME;
}

export interface MainMenuModeJunkyad {
    readonly type: MainMenuMode.MMM_JUNKYARD;
}

export interface MainMenuModeMainMenu {
    readonly type: MainMenuMode.MMM_MAINMENU;
}

export interface MainMenuModeSettings {
    readonly type: MainMenuMode.MMM_SETTINGS;
}

export interface MainMenuModeContinue {
    readonly type: MainMenuMode.MMM_CONTINUE;
}

export type MainMenuModeAction = MainMenuModeNewGame | MainMenuModeJunkyad | MainMenuModeMainMenu | MainMenuModeSettings | MainMenuModeContinue;



export const goToNewGame = () => action(MainMenuMode.MMM_NEWGAME, 0);

export const goToJunkyard = () => action(MainMenuMode.MMM_JUNKYARD, 0);

export const goToMainMenu = () => action(MainMenuMode.MMM_MAINMENU, 0);

export const goToSettings = () => action(MainMenuMode.MMM_SETTINGS, 0);

export const continueGame = () => action(MainMenuMode.MMM_CONTINUE, 0);
