import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';

import myCombinedReducers from './reducers';



let middleware: any[] = [];
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    const logger = createLogger({
        diff: true,
    });
    middleware = [...middleware, logger];
}



export const store = createStore(myCombinedReducers, applyMiddleware(...middleware));


export const unsubscribe = store.subscribe( () => console.log(store.getState() ));

