import { GameState, GameStateTypes, GameStats } from '../models';

export const getGameMode = (state: GameState): GameStateTypes => state.mode;

export const getGameStats = (state: GameState): GameStats => state.stats;
