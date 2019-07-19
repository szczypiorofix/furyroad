import { Reducer } from 'redux';
import { ResetGameStats, GameMode } from '../actions';
import { GameEvent } from '../../components/maingame/gameevents';


const gameEventsReducer: Reducer<GameEvent[], ResetGameStats> = ( state: GameEvent[] = [], action: ResetGameStats): GameEvent[] => {
    switch (action.type) {
        case GameMode.GAME_RESETSTAT:
            return [];
    }
    return state;
}

export default gameEventsReducer;