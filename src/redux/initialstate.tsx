
import { GameRootState, MainGameStateTypes } from '../models';


const initialState: GameRootState = {
    mainmenustate: {
        mode: MainGameStateTypes.MAIN_MENU
    },
    gamestats: {
        fuel: 50,
        water: 20
    }
}

export default initialState;
