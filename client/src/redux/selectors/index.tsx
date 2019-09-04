import { GameRootState } from '../../models';

export const getGameRootState = (state:  GameRootState): GameRootState => state;

export * from './gamestateselector';
export * from './gamestatsselector';
export * from './gamesettingsselector';
export * from './gameloginselector';