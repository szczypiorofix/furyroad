import { createStore, applyMiddleware, Store } from 'redux';
import { createLogger } from 'redux-logger';
import myCombinedReducers from './reducers';
import initialState from './initialstate';
import { GameRootState, GameStats, MainGameStateTypes } from '../models';



let middleware: any[] = [];
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    const logger = createLogger({
        diff: true,
    });
    middleware = [...middleware, logger];
}

function configureStore(): Store<GameRootState> {    
    const store = createStore< GameRootState, any, any, any>(myCombinedReducers, { gamestats:loadState(), mainmenustate: { mode: MainGameStateTypes.MAIN_MENU } }, applyMiddleware(...middleware));
    return store;
}

export const LOCAL_STORAGE_SAVED_STATE_NAME = 'gameSavedState';

export const loadState = (): GameStats | undefined => {
    try {
        const serializedState = localStorage.getItem(LOCAL_STORAGE_SAVED_STATE_NAME);
        if (serializedState !== null) {
            console.log("Reading localStorage...");
            return JSON.parse(serializedState);
        }
        else console.log("Storage == null");
    } catch (err) {
        console.log('Storage error: '+err);
        return initialState.gamestats;
    }
};

export const saveGameState = (stats: GameStats) => {
    try {
        const serializedStats = JSON.stringify(stats);
        localStorage.setItem('gameSavedState', serializedStats);
        console.log('game saved');
    } catch {
        // ignore write errors
    }
};

const store = configureStore();
// store.subscribe(
//     () => {
//         saveGameState(store.getState());
//     }
// );

export default store;
