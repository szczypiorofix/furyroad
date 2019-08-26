import { GameSettings,  GameRootState, SavedState } from '../../models';


export const getGameSettings = (state:  GameRootState): GameSettings => state.savedstate.gamesettings;
export const getSavedState = (state: GameRootState): SavedState => state.savedstate; 