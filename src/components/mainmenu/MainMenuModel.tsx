import { MainMenuState } from '../../models';

export interface MainMenuProps {
    startNewGame: () => void,
    gotoJunkyard: () => void,
    gameMode: MainMenuState
}
