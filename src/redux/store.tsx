import { createStore, applyMiddleware, Store } from 'redux';
import { createLogger } from 'redux-logger';
import myCombinedReducers from './reducers';
import initialState from './initialstate';
import { GameRootState } from '../models';


let middleware: any[] = [];
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    const logger = createLogger({
        diff: true,
    });
    middleware = [...middleware, logger];
}

export function configureStore(): Store<GameRootState> {
    const store = createStore< GameRootState, any, any, any>(myCombinedReducers, initialState, applyMiddleware(...middleware));
    return store;
}
