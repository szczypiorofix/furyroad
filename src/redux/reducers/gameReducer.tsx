import { Reducer } from 'redux';

import { GameState, GameStateTypes } from '../../models';
import { GameAction, GameActions } from '../../redux/actions';
import { InitialGameState } from '../../redux/InitialState';

const gameReducer: Reducer<GameState, GameAction> = (state:GameState = InitialGameState, action:GameAction) => {
    switch (action.type) {
        case GameActions.START_NEW_GAME:
            return {...state, mode: GameStateTypes.NEW_GAME};
        case GameActions.CONTINUE:
            return {...state, mode: GameStateTypes.CONTINUE};
        case GameActions.SETTINGS:
            return {...state, mode: GameStateTypes.SETTINGS};
        case GameActions.JUNKYARD:
            return {...state, mode: GameStateTypes.JUNKYARD};
        case GameActions.MAIN_MENU:
            return {...state, mode: GameStateTypes.MAIN_MENU};
        case GameActions.END_GAME:
            return {...state, mode: GameStateTypes.ENDGAME};
        default:
            return state;
    }
};

export default gameReducer;
