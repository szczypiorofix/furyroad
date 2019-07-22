import { MainMenuState, GameStats, StatToModify } from '../../models';
import { GameEvent } from './gameevents';

export interface MainGameState {
    currentEvent: GameEvent;
    historyOfEvents: GameEvent[];
}

export interface MainGameProps {
    
    mainState: MainMenuState,
    stats: GameStats,
    getGameEvents: GameEvent[],

    gotoMainMenu: () => void,
    goToEndGame: () => void,
    modStat: (stat: StatToModify) => void,
    setStat: (stat: StatToModify) => void,
}
