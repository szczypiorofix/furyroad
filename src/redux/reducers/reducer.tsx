
import { TodoAction, CombinedActions, VisibilityAction, SET_VISIBILITY_FILTER } from '../actions';
import initialState from '../initialstate';


export function todoApp( state:CombinedActions = initialState, action:TodoAction ):CombinedActions {
    switch(action.type) {
        case "ADD_TODO":
            return {...state, action1: { type: "ACTION CHANGED", text: "Another action" } };
        default:
            return state;
    }
}

export function visibilityFilter( state: CombinedActions = initialState, action:VisibilityAction ):CombinedActions {
    switch (action.type) {
    case SET_VISIBILITY_FILTER:
        return {...state, action2: { type: SET_VISIBILITY_FILTER, filter : "Twinkie-Winkie!" } };
    default:
        return state
    }
}
