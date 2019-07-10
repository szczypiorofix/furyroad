import { GameState } from '../models';

export const getGameMode = (state: GameState): string => state.mode;
