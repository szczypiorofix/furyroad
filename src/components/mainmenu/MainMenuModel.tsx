import { MainMenuState, GameStats } from '../../models';
import { SavedState } from '../../models';

export interface MainMenuProps {
    gameMode: MainMenuState,
    
    startNewGame: () => void,
    gotoJunkyard: () => void,
    gotoSettings: () => void,
    continueGame: () => void

    resetSavedState: (initial: SavedState) => void
}
