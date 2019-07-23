import { Reducer } from 'redux';
import { GameModeAction, GameStatsActions } from '../actions';
import initialState from '../initialstate';
import { GameStats } from '../../models';


const gameStatsReducer: Reducer<GameStats, GameModeAction> = ( state: GameStats = initialState.savedstate.gamestats, action: GameModeAction): GameStats => {
    switch (action.type) {
        case GameStatsActions.GAME_MODSTAT:
            return {...state, [action.payload.attribute]: state[action.payload.attribute] + action.payload.value}
        case GameStatsActions.GAME_SETSTAT:
            return {...state, [action.payload.attribute]: action.payload.value}
        case GameStatsActions.GAME_RESETSTATS:
            return initialState.savedstate.gamestats;
        default:
            return state;
    }
}

export default gameStatsReducer;