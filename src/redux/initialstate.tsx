import { TodoAction, CombinedActions, VisibilityAction, SET_VISIBILITY_FILTER } from './actions';


let todoAction:TodoAction = {
    type: "ADD_TODO",
    text: "Initial state ADD TODO"
}

let visibilityAction: VisibilityAction = {
    type: SET_VISIBILITY_FILTER,
    filter: "Show all options"
}


var initialState:CombinedActions = {
    action1: todoAction,
    action2: visibilityAction
}

export default initialState;
