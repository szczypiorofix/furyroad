import { combineReducers } from 'redux'


import { TodoAction, CombinedActions, VisibilityAction, SET_VISIBILITY_FILTER } from './actions';


const todoAction:TodoAction = {
    type: "ADD_TODO",
    text: "Initial state ADD TODO"
}

const visibilityAction: VisibilityAction = {
    type: 'SHOW_ALL',
    filter: "Show all options"
}

export const initialState:CombinedActions = {
    action1: todoAction,
    action2: visibilityAction
}


export function todoApp( state:CombinedActions = initialState, action:TodoAction ) {
    switch(action.type) {
        case "ADD_TODO":
            return Object.assign({}, state, {action1: {type: "ADD_TODO", text: action.text}} 
            );
        default:
            return state;
    }
}

export function visibilityFilter( state = initialState, action:VisibilityAction ) {
    switch (action.type) {
    case SET_VISIBILITY_FILTER:
        return state
    default:
        return state
    }
}

const myCombinedReducers = combineReducers({
    action1: visibilityFilter,
    action2: todoApp
});

export default myCombinedReducers;
