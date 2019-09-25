import { IGameStats } from "furyroad-interfaces";
import { Reducer } from "redux";
import { GameStatsAction, GameStatsActions } from "../actions";
import initialState from "../initialstate";

const gameStatsReducer: Reducer<IGameStats, GameStatsAction> = (
  state: IGameStats = initialState.savedstate.gamestats,
  action: GameStatsAction,
): IGameStats => {
  switch (action.type) {
    case GameStatsActions.GAME_MODSTAT:
      return { ...state, [action.payload.attribute]: state[action.payload.attribute] + action.payload.value };
    case GameStatsActions.GAME_SETSTAT:
      return { ...state, [action.payload.attribute]: action.payload.value };
    case GameStatsActions.GAME_RESETSTATS:
      return initialState.savedstate.gamestats;
    case GameStatsActions.GAME_LOADSTATS:
      return action.payload.gamestats;
    default:
      return state;
  }
};

export default gameStatsReducer;
