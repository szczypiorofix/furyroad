import { SavedState, MainMenuState, GameSettings } from '../../models';

export interface MainMenuProps {
    gameMode: MainMenuState,
    gameSettings: GameSettings,
    
    startNewGame: () => void,
    gotoJunkyard: () => void,
    gotoSettings: () => void,
    continueGame: () => void,
    toggleContinueGame: (v:boolean) => void,
    
    resetSavedState: (initial: SavedState) => void
}
