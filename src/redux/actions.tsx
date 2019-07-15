
// Action types
// export enum ActionTypes {
//     ADD_TODO = "ADD_TODO",
//     REM_TODO = "REM_TODO",
// }

export const VisibilityFilters = {
    SHOW_ALL: 'SHOW_ALL',
    SHOW_ACTIVE: 'SHOW_ACTIVE'
}


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
    return { type: 'CHANGE_VISIBILITY', filter }
}
