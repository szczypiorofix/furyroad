import { combineReducers } from 'redux'
import { visibilityFilter, todoApp } from './reducer';


const myCombinedReducers = combineReducers({
    action1: visibilityFilter,
    action2: todoApp
});


// export * from './reducer';

export default myCombinedReducers;
