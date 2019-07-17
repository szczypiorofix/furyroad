import { Reducer } from 'redux';
import { GameModeAction, GameMode } from '../actions';
import initialState from '../initialstate';
import { GameStats } from '../../models';


const gameStatsReducer: Reducer<GameStats, GameModeAction> = ( state: GameStats = initialState.gamestats, action: GameModeAction): GameStats => {
    switch (action.type) {
        case GameMode.GAME_MODFUEL:
            return { ...state, fuel: state.fuel + action.payload }           
        case GameMode.GAME_MODWATER:
            return { ...state, water: state.water + action.payload }
        default:
            return state;
    }
}

export default gameStatsReducer;