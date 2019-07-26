
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
            distanceDriven: 0,
            carFuelUsage: 1.0,
            carSpeed: 90.0,
            carMaxSpeed: 1.0,
            attactRate: 2,
            defenseRate: 2
        },
        gameeventshistory: []
    }
}

export default initialState;
