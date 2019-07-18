import { MainMenuState, GameStats } from '../../models';

export interface MainMenuProps {
    gameMode: MainMenuState,
    
    startNewGame: () => void,
    gotoJunkyard: () => void,
    gotoSettings: () => void,
    continueGame: () => void

    resetStatsToValue: (initial: GameStats) => void
}
