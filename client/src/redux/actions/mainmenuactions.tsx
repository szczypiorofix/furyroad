import { action } from "typesafe-actions";

export enum MainMenuActions {
  MM_CONTINUE = "MM_CONTINUE",
  MM_NEWGAME = "MM_NEWGAME",
  MM_SETTINGS = "MM_SETTINGS",
  MM_JUNKYARD = "MM_JUNKYARD",
  MM_MAINMENU = "MM_MAINMENU",
  MM_ENDGAME = "MM_ENDGAME",
  MM_SPLASHSCREEN = "MM_SPLASHSCREEN",
}

export interface IMainMenuActionNewGame {
  readonly type: MainMenuActions.MM_NEWGAME;
}

export interface IMainMenuActionJunkyad {
  readonly type: MainMenuActions.MM_JUNKYARD;
}

export interface IMainMenuActionMainMenu {
  readonly type: MainMenuActions.MM_MAINMENU;
}

export interface IMainMenuActionEndGame {
  readonly type: MainMenuActions.MM_ENDGAME;
}

export interface IMainMenuActionSettings {
  readonly type: MainMenuActions.MM_SETTINGS;
}

export interface IMainMenuActionContinue {
  readonly type: MainMenuActions.MM_CONTINUE;
}

export interface IMainMenuActionSplashScreen {
  readonly type: MainMenuActions.MM_SPLASHSCREEN;
}

export type MainMenuAction =
  | IMainMenuActionNewGame
  | IMainMenuActionJunkyad
  | IMainMenuActionMainMenu
  | IMainMenuActionSettings
  | IMainMenuActionContinue
  | IMainMenuActionEndGame
  | IMainMenuActionSplashScreen;

export const goToNewGame = () => action(MainMenuActions.MM_NEWGAME, 0);

export const goToJunkyard = () => action(MainMenuActions.MM_JUNKYARD, 0);

export const goToMainMenu = () => action(MainMenuActions.MM_MAINMENU, 0);

export const goToEndGame = () => action(MainMenuActions.MM_ENDGAME, 0);

export const goToSettings = () => action(MainMenuActions.MM_SETTINGS, 0);

export const continueGame = () => action(MainMenuActions.MM_CONTINUE, 0);

export const goToSplashScreen = () => action(MainMenuActions.MM_SPLASHSCREEN, 0);
