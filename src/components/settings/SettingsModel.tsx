import { MainMenuState } from '../../models';

export interface SettingsProps {
    gotoMainMenu: () => void,
    gameMode: MainMenuState
}
