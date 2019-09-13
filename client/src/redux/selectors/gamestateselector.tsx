import { IGameRootState, IMainMenuState } from "../../models";

export const getGameMode = (state: IGameRootState): IMainMenuState => state.mainmenustate;
