import { combineReducers } from 'redux'

import { GameRootState, SavedState } from '../../models';

import mainmenureducer from './mainmenureducer';
import gameStatsReducer from './gamestatsreducer';
import gameEventsReducer from './gameventsreducer';
import gameSettingsReducer from './gamesettingsreducer';


const savedStateCombinedReducers = combineReducers<SavedState>({
    gamestats: gameStatsReducer,
    gameeventshistory: gameEventsReducer,
    gamesettings: gameSettingsReducer
});

const myCombinedReducers = combineReducers<GameRootState>({
    mainmenustate: mainmenureducer,
    savedstate: savedStateCombinedReducers
});

export default myCombinedReducers;
