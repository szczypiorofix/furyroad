import { MainMenuState, GameStats, StatToModify, GameSettings } from '../../models';
import { GameEvent } from './gameevents';

export interface MainGameState {
    paused: boolean;
    drawnEventNumber: number;
    currentEvent: GameEvent;
    historyOfEvents: GameEvent[];
}

export interface MainGameProps {
    
    mainState: MainMenuState,
    stats: GameStats,
    getGameEvents: GameEvent[],
    gameSettings: GameSettings,

    gotoMainMenu: () => void,
    goToEndGame: () => void,
    modStat: (stat: StatToModify) => void,
    setStat: (stat: StatToModify) => void,
    toggleContinueGame: (v:boolean) => void
}
