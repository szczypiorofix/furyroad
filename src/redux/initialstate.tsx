
import { GameRootState, MainGameStateTypes } from '../models';


const initialState: GameRootState = {
    mainmenustate: {
        mode: MainGameStateTypes.MAIN_MENU
    },
    savedstate: {
        gamestats: {
            fuel: 50,
            water: 20,
            food: 20
        },
        gameeventshistory: []
    }
}

export default initialState;
