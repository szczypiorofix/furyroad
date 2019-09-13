import { IMainMenuState } from "../../models";

export interface IJunkyardProps {
  gotoMainMenu: () => void;
  gameMode: IMainMenuState;
}
