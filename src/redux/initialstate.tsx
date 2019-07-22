
import { GameRootState, MainGameStateTypes } from '../models';


const initialState: GameRootState = {
    mainmenustate: {
        mode: MainGameStateTypes.MAIN_MENU
    },
    savedstate: {
        gamestats: {
            fuel: 30,
            maxFuel: 30,
            water: 15,
            food: 15,
            scrap: 0,
            carHealth: 100,
            carMaxHealth: 100,
            carTemperature: 70,
            carMaxTemperature: 120,
            distanceDriven: 0
        },
        gameeventshistory: []
    }
}

export default initialState;
