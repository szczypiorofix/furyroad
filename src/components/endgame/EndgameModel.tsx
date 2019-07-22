import { MainMenuState, GameStats, StatToModify } from '../../models';


export interface EndGameProps {
    
    mainState: MainMenuState,
    stats: GameStats,

    gotoMainMenu: () => void
}
