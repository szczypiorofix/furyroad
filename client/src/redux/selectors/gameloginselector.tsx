import { IGameLogin } from "furyroad-interfaces";
import { IGameRootState } from "../../models";

export const getLogin = (state: IGameRootState): IGameLogin => state.savedstate.gamelogin;
export const getEmail = (state: IGameRootState): string => state.savedstate.gamelogin.email;
export const getUUID = (state: IGameRootState): string => state.savedstate.gamelogin.uuid;
