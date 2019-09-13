import { IGameSettings } from "furyroad-interfaces";
import { IMainMenuState } from "../../models";

export interface IMusicBoxModel {
  gameMode: IMainMenuState;
  gameSettings: IGameSettings;
}
