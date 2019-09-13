import { combineReducers } from "redux";

import { ISavedState } from "furyroad-interfaces";
import { IGameRootState } from "../../models";

import gameLoginReducer from "./gameloginreducer";
import gameSettingsReducer from "./gamesettingsreducer";
import gameStatsReducer from "./gamestatsreducer";
import gameEventsReducer from "./gameventsreducer";
import mainmenureducer from "./mainmenureducer";

const savedStateCombinedReducers = combineReducers<ISavedState>({
  gamestats: gameStatsReducer,
  gameeventshistory: gameEventsReducer,
  gamesettings: gameSettingsReducer,
  gamelogin: gameLoginReducer,
});

const myCombinedReducers = combineReducers<IGameRootState>({
  mainmenustate: mainmenureducer,
  savedstate: savedStateCombinedReducers,
});

export default myCombinedReducers;
