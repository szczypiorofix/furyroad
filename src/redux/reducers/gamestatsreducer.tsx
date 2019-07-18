import { Reducer } from 'redux';
import { GameModeAction, GameMode } from '../actions';
import initialState from '../initialstate';
import { GameStats } from '../../models';


const gameStatsReducer: Reducer<GameStats, GameModeAction> = ( state: GameStats = initialState.gamestats, action: GameModeAction): GameStats => {
    switch (action.type) {
        case GameMode.GAME_MODSTAT:
            return {...state, [action.payload.attribute]: state[action.payload.attribute] + action.payload.value}
        case GameMode.GAME_RESETSTAT:
            return initialState.gamestats;
        default:
            return state;
    }
}

export default gameStatsReducer;