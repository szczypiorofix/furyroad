import { IGameEvent, IGameStats } from "furyroad-interfaces";
import { IGameRootState } from "../../models";

export const getGameStats = (state: IGameRootState): IGameStats => state.savedstate.gamestats;

export const getGameEvents = (state: IGameRootState): IGameEvent[] => state.savedstate.gameeventshistory;
