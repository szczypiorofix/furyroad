import { combineReducers } from 'redux'

import mainmenureducer from './mainmenureducer';
import gameStatsReducer from './gamestatsreducer';
import gameEventsReducer from './gameventsreducer';
import gameSettingsReducer from './gamesettingsreducer';


const savedStateCombinedReducers = combineReducers({
    gamestats: gameStatsReducer,
    gameeventshistory: gameEventsReducer,
    gamesettings: gameSettingsReducer
});

const myCombinedReducers = combineReducers({
    mainmenustate: mainmenureducer,
    savedstate: savedStateCombinedReducers
});

export default myCombinedReducers;
