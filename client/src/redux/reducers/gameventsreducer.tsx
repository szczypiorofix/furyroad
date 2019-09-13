import { IGameEvent } from "furyroad-interfaces";
import { Reducer } from "redux";
import { GameStatsActions, IGameStatsActionResetStat } from "../actions";

const gameEventsReducer: Reducer<IGameEvent[], IGameStatsActionResetStat> = (
  state: IGameEvent[] = [],
  action: IGameStatsActionResetStat,
): IGameEvent[] => {
  switch (action.type) {
    case GameStatsActions.GAME_RESETSTATS:
      return [];
  }
  return state;
};

export default gameEventsReducer;
