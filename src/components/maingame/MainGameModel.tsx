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
    modStat:  (stat: StatToModify) => void
}
