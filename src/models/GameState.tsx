import { GameEvent } from "../components/maingame/gameevents";

export enum MainGameStateTypes {
    MAIN_MENU = "MAIN_MENU",
    CONTINUE = "CONTINUE",
    NEW_GAME = "NEW_GAME",
    SETTINGS = "SETTINGS",
    JUNKYARD = "JUNKYARD",
    ENDGAME = "ENDGAME"
}

export enum GameStatsEnum {
    FUEL="fuel",
    WATER="water",
    FOOD="food",
    SCRAP="scrap",
    CARHEALTH="carHealth",
    CARMAXHEALTH="carMaxHealth",
    CARTEMPERATURE="carTemperature",
    CARMAXTEMPERATURE="carMaxTemperature",
    DISTANCEDRIVEN="distanceDriven"
}

export interface GameStats {
    [key: string]:      number,
    fuel:               number,
    maxFuel:            number,
    water:              number,
    food:               number,
    scrap:              number,
    carHealth:          number,
    carMaxHealth:       number,
    carTemperature:     number,
    carMaxTemperature:  number,
    distanceDriven:     number
}

export interface StatToModify {
    attribute: string,
    value: number
}

export interface MainMenuState {
    mode: MainGameStateTypes
}

export interface SavedState {
    gamestats: GameStats;
    gameeventshistory: GameEvent[]
}

export interface GameRootState {
    mainmenustate: MainMenuState;
    savedstate: SavedState;
}
