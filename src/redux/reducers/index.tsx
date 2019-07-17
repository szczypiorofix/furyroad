import { combineReducers } from 'redux'


import mainmenureducer from './mainmenureducer';
import gameStatsReducer from './gamestatsreducer';

const myCombinedReducers = combineReducers({
    mainmenustate: mainmenureducer,
    gamestats: gameStatsReducer
});

export default myCombinedReducers;
