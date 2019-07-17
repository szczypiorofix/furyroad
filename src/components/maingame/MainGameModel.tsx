import { MainMenuState, GameStats, StatToModify } from '../../models';

export interface MainGameProps {
    mainState: MainMenuState,
    stats: GameStats,
    gotoMainMenu: () => void,
    modStat:  (stat: StatToModify) => void
}
