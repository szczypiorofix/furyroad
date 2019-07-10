import { Reducer } from 'redux';

import { GameState } from '../../models';
import { GameAction, GameActions } from '../../redux/actions';
import { InitialGameState } from '../../redux/InitialState';

const gameReducer: Reducer<GameState, GameAction> = (state:GameState = InitialGameState, action:GameAction) => {
    switch (action.type) {
        case GameActions.START_NEW_GAME:
            return {...state, mode: 'new_game'};
        case GameActions.CONTINUE:
            return {...state, mode: 'continue'};
        case GameActions.SETTINGS:
            return {...state, mode: 'settings'};
        case GameActions.JUNKYARD:
            return {...state, mode: 'junkyard'};
        case GameActions.MAIN_MENU:
            return {...state, mode: 'main_menu'};
        case GameActions.END_GAME:
            return {...state, mode: 'endgame'};
        default:
            return state;
    }
};

export default gameReducer;
