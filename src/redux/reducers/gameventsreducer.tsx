import { Reducer } from 'redux';
import { GameStatsActionResetStat, GameStatsActions } from '../actions';
import { GameEvent } from '../../components/maingame/gameevents';


const gameEventsReducer: Reducer<GameEvent[], GameStatsActionResetStat> = ( state: GameEvent[] = [], action: GameStatsActionResetStat): GameEvent[] => {
    switch (action.type) {
        case GameStatsActions.GAME_RESETSTATS:
            return [];
    }
    return state;
}

export default gameEventsReducer;