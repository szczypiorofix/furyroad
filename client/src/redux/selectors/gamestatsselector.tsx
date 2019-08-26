import { GameStats, GameRootState } from '../../models';
import { GameEvent } from '../../components/maingame/gameevents';


export const getGameStats = (state: GameRootState): GameStats => state.savedstate.gamestats;

export const getGameEvents = (state: GameRootState): GameEvent[] => state.savedstate.gameeventshistory;
