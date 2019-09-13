import { IGameRootState } from "../../models";

export const getGameRootState = (state: IGameRootState): IGameRootState => state;

export * from "./gamestateselector";
export * from "./gamestatsselector";
export * from "./gamesettingsselector";
export * from "./gameloginselector";
