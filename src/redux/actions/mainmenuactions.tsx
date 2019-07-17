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
    readonly payload: number;
}

export interface MainMenuModeJunkyad {
    readonly type: MainMenuMode.MMM_JUNKYARD;
    readonly payload: number;
}

export interface MainMenuModeMainMenu {
    readonly type: MainMenuMode.MMM_MAINMENU;
    readonly payload: number;
}

export type MainMenuModeAction = MainMenuModeNewGame | MainMenuModeJunkyad | MainMenuModeMainMenu;




export const goToNewGame = () => action(MainMenuMode.MMM_NEWGAME, 0);

export const goToJunkyard = () => action(MainMenuMode.MMM_JUNKYARD, 0);

export const goToMainMenu = () => action(MainMenuMode.MMM_MAINMENU, 0);
