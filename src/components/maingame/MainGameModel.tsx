import { MainMenuState, GameStats, StatToModify } from '../../models';
import { GameEvent, EventTypes } from './gameevents';

export interface MainGameState {
    currentEvent: GameEvent;
    historyOfEvents: GameEvent[];
}

export const initialGameEvent:GameEvent = {
    type: EventTypes.START_GAME,
    name: "Game start",
    chance: 100,
    text: "Starting game..."
}

export interface MainGameProps {
    
    mainState: MainMenuState,
    stats: GameStats,

    gotoMainMenu: () => void,
    modStat:  (stat: StatToModify) => void
}
