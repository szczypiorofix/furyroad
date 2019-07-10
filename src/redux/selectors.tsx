import { GameState, GameStateTypes } from '../models';

export const getGameMode = (state: GameState): GameStateTypes => state.mode;
