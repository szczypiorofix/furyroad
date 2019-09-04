import { GameRootState, GameLogin } from '../../models';

export const getLogin = (state:  GameRootState): GameLogin => state.savedstate.gamelogin;
export const getEmail = (state:  GameRootState): string => state.savedstate.gamelogin.email;
export const getUUID = (state: GameRootState): string => state.savedstate.gamelogin.uuid;
