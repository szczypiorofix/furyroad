import { GameStats, GameRootState } from '../../models';


export const getGameStats = (state: GameRootState): GameStats => state.gamestats;
