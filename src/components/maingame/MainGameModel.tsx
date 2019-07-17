import { MainMenuState, GameStats } from '../../models';

export interface MainGameProps {
    mainState: MainMenuState,
    stats: GameStats,
    gotoMainMenu: () => void,
    modFuel:  (amount: number) => void,
    modWater:  (amount: number) => void
}
