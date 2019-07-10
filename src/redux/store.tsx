import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';

import gameReducer from './reducers/gameReducer';
import { GameState } from '../models';
import { InitialGameState } from './InitialState';

let middleware: any[] = [];
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    const logger = createLogger({
        diff: true,
    });
    middleware = [...middleware, logger];
}

export const loadState = (): GameState | undefined => {
    try {
        // Wczytywanie z localStorage po odświeżeniu strony
        
        // const serializedState = localStorage.getItem('state');
        // if (serializedState === null) {
        //     return InitialGameState;
        // }
        // return JSON.parse(serializedState);
    } catch (err) {
        return InitialGameState;
    }
};

export const saveState = (state: GameState) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('state', serializedState);
        console.log('saved');
    } catch {
        // ignore write errors
    }
};

const store = createStore<GameState, any, any, any>(gameReducer, loadState(), applyMiddleware(...middleware));
store.subscribe(() => {
    saveState(store.getState());
});

export default store;
