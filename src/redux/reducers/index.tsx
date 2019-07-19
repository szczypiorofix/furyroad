import { combineReducers } from 'redux'

import mainmenureducer from './mainmenureducer';
import gameStatsReducer from './gamestatsreducer';
import gameEventsReducer from './gameventsreducer';

const savedStateCombinedReducers = combineReducers({
    gamestats: gameStatsReducer,
    gameeventshistory: gameEventsReducer
});

const myCombinedReducers = combineReducers({
    mainmenustate: mainmenureducer,
    savedstate: savedStateCombinedReducers
});

export default myCombinedReducers;
