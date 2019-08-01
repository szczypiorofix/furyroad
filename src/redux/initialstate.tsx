
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
            carFuelUsage: 0.25,
            carSpeed: 90.0,
            carMaxSpeed: 1.0,
            attactRate: 2,
            defenseRate: 2,
            daysPassed: 0,
            hoursPassed: 0,
            score: 0
        },
        gameeventshistory: [],
        gamesettings: {
            musicOn: false,
            musicVolume: 50,
            canContinue: false
        },
    }
}

export default initialState;
