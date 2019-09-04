import { SavedState, MainMenuState, GameSettings, GameLogin } from '../../models';

export interface MainMenuProps {
    gameMode: MainMenuState,
    gameSettings: GameSettings,
    getLogin: GameLogin,
    
    startNewGame: () => void,
    gotoJunkyard: () => void,
    gotoSettings: () => void,
    continueGame: () => void,
    toggleContinueGame: (v:boolean) => void,
    gotoSplashScreen: () => void,
    
    logout: (gameLogin: GameLogin) => void,

    resetSavedState: (initial: SavedState) => void
}
