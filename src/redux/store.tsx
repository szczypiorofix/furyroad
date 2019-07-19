import { createStore, applyMiddleware, Store } from 'redux';
import { createLogger } from 'redux-logger';
import myCombinedReducers from './reducers';
import initialState from './initialstate';
import { GameRootState, SavedState, MainGameStateTypes } from '../models';
// import { GameEvent } from '../components/maingame/gameevents';



let middleware: any[] = [];
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    const logger = createLogger({
        diff: true,
    });
    middleware = [...middleware, logger];
}


function configureStore(): Store<GameRootState> {    
    const store = createStore< GameRootState, any, any, any>(myCombinedReducers, { savedstate:loadState(), mainmenustate: { mode: MainGameStateTypes.MAIN_MENU } }, applyMiddleware(...middleware));
    return store;
}


export const LOCAL_STORAGE_SAVED_STATE_NAME = 'gameSavedState';


export const loadState = (): SavedState | undefined => {
    try {
        const serializedState = localStorage.getItem(LOCAL_STORAGE_SAVED_STATE_NAME);
        if (serializedState !== null) {
            console.log("Reading localStorage...");
            return JSON.parse(serializedState);
        }
        else console.log("Storage == null");
    } catch (err) {
        console.log('Storage error: '+err);
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


const store = configureStore();


export default store;
