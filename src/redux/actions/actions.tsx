
// Action types



export interface TodoAction {
    type: string,
    text: string
}

export interface VisibilityAction {
    type: string,
    filter: string
}

export interface CombinedActions {
    action1: TodoAction,
    action2: VisibilityAction
}

export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'


// Action creators
export function addTodo(text: string) {
    return {type: "ADD_TODO", text};
}


export function changeVisibility(filter:string) {
    return { type: SET_VISIBILITY_FILTER, filter }
}
