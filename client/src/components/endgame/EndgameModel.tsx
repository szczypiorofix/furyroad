import { MainMenuState, GameStats, SavedState, GameSettings } from '../../models';


export interface EndGameProps {
    
    mainState: MainMenuState,
    stats: GameStats,
    gameSettings: GameSettings,

    gotoMainMenu: () => void,
    toggleContinueGame: (v:boolean) => void,
    resetSavedState: (state:SavedState) => void
}
