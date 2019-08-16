import { createStore, applyMiddleware, Store, Middleware, AnyAction } from 'redux';
import { createLogger } from 'redux-logger';
import myCombinedReducers from './reducers';
import initialState from './initialstate';
import { GameRootState, SavedState, MainGameStateTypes } from '../models';



export const LOCAL_STORAGE_SAVED_STATE_NAME:string = 'gameSavedState';

export const loadState = (): SavedState | undefined => {
    try {
        const serializedState: string | null = localStorage.getItem(LOCAL_STORAGE_SAVED_STATE_NAME);
        if (serializedState !== null) {
            console.log("Reading localStorage...");
            return JSON.parse(serializedState);
        }
        else console.log("Storage == null");
    } catch (err) {
        console.log('Storage error: ' + err);
        return initialState.savedstate;
    }
};


export const saveGameState = (savedState: SavedState) => {
    try {
        const serializedSavedState = JSON.stringify(savedState);
        localStorage.setItem('gameSavedState', serializedSavedState);
        console.log('game saved');
    } catch {
        // ignore write errors
    }
};

function configureStore(mid: Middleware[]): Store<GameRootState, AnyAction> {    
    const store:Store<GameRootState, AnyAction> = createStore< GameRootState, any, any, any>(myCombinedReducers, {
        savedstate:loadState(),
        mainmenustate: {
            mode: MainGameStateTypes.SPLASHSCREEN
        }
    }, applyMiddleware(...mid));
    return store;
}

let middleware: Middleware[] = [];
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    const logger = createLogger({
        diff: true
    });
    middleware = [...middleware
        ,logger
    ];
}

const store: Store<GameRootState, AnyAction> = configureStore(middleware);
store.subscribe(() => saveGameState(store.getState().savedstate));

export default store;
