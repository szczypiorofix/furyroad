import { GameState, GameStateTypes } from "../models";

export const InitialGameState: GameState = {
    mode: GameStateTypes.MAIN_MENU,
    stats: {
        fuel: 100,
        fuelConsumption: 1,
        currentSpeed: 0,
        distance: 0,
        carHealth: 100,
        carMaxHealth: 100,
        carAttactRatio: 1,
        carShields: 0,
        food: 20,
        water: 20,
        scrap: 0
    }
};
