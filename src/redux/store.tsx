import { createStore } from 'redux';

import { CombinedActions } from './actions';
import myCombinedReducers from './reducer';



export const initialState:CombinedActions = {
    action1: {
        type: "ADD_TODO",
        text: "Initial state ADD TODO"
    },
    action2: {
        type: 'SHOW_ALL',
        filter: "Show all options"
    }
}

export const store = createStore(myCombinedReducers);

export const unsubscribe = store.subscribe( () => console.log(store.getState() ));

