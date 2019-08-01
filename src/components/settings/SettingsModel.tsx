import { MainMenuState, GameSettings, SavedState } from '../../models';

export interface SettingsProps {
    gameMode: MainMenuState,
    gameSettings: GameSettings,
    savedState: SavedState,

    gotoMainMenu: () => void,
    toggleMusic: (v:boolean) => void,
    resetSavedState: (state:SavedState) => void,
    toggleContinueGame: (v:boolean) => void
}
