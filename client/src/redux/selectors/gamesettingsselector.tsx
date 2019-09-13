import { IGameSettings, ISavedState } from "furyroad-interfaces";
import { IGameRootState } from "../../models";

export const getGameSettings = (state: IGameRootState): IGameSettings => state.savedstate.gamesettings;
export const getSavedState = (state: IGameRootState): ISavedState => state.savedstate;
