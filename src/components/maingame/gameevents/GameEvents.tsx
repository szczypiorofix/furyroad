
export enum EventTypes {
    START_GAME,
    VILLAGE,
    FIGHT,
    ENCOUNTER,
    TERRAIN
}

export enum LootToFound {
    WATER,
    FOOD,
    SCRAP,
    FUEL,
    WATER_FOOD,
    WATER_SCRAP,
    WATER_FOOD_SCRAP,
    FOOD_SCRAP,
    CAR_HEALTH_LOOSE,
    NONE
}

export const initialGameEvent:GameEvent = {
    type: EventTypes.START_GAME,
    name: "Game start",
    chance: 100,
    text: "Starting game...",
    found: LootToFound.NONE
}

export const historyEventsMaxList: number = 20;

export interface GameEvent {
    type:    EventTypes,
    name:    string,
    chance:  number, // x / 100 to appear
    text:    string,
    found: LootToFound
}

export const GameEvents:GameEvent[] = [
    {
        type: EventTypes.TERRAIN,
        chance: 60,
        name: "Piaszczysta droga",
        text: "Wkraczasz na piaszczystą drogę",
        found: LootToFound.NONE
    },
    {
        type: EventTypes.TERRAIN,
        chance: 50,
        name: "Twarda ubita droga",
        text: "Wkraczasz na ubitą drogę",
        found: LootToFound.NONE
    },
    {
        type: EventTypes.TERRAIN,
        chance: 30,
        name: "Błotnista droga",
        text: "Wkraczasz na błotnistą drogę",
        found: LootToFound.NONE
    },
    {
        type: EventTypes.TERRAIN,
        chance: 20,
        name: "Kamienista droga",
        text: "Wkraczasz na kamienistą drogę",
        found: LootToFound.NONE
    },


    {
        type: EventTypes.FIGHT,
        chance: 40,
        name: "Walka z bandytami",
        text: "Zauważasz grupę bandytów którzy Cię atakują",
        found: LootToFound.NONE
    },
    {
        type: EventTypes.FIGHT,
        chance: 30,
        name: "Sfora zdziczałych psów",
        text: "Dopadła Cię sfora zdziczałych psów, musisz się bronić",
        found: LootToFound.NONE
    },
    {
        type: EventTypes.FIGHT,
        chance: 25,
        name: "Sępy",
        text: "Dopadła Cię stado wygłodniałych sępów",
        found: LootToFound.NONE
    },
    {
        type: EventTypes.FIGHT,
        chance: 20,
        name: "Gang Czach",
        text: "Dopadł Cię gang Czach. Musisz się bronić.",
        found: LootToFound.FUEL
    },
    {
        type: EventTypes.FIGHT,
        chance: 34,
        name: "Bandyci",
        text: "Dopadli Cię bandyci.",
        found: LootToFound.FUEL
    },
    {
        type: EventTypes.FIGHT,
        chance: 30,
        name: "Gang Kopaczy",
        text: "Dopadł Cię gang Kopaczy.",
        found: LootToFound.FUEL
    },
    {
        type: EventTypes.FIGHT,
        chance: 10,
        name: "Immortan Joe",
        text: "Ściga Cię sam Immortan Joe! Broń się!",
        found: LootToFound.FUEL
    },

    {
        type: EventTypes.ENCOUNTER,
        chance: 80,
        name: "Dziura w jezdni",
        text: "Interceptor wpada w dziurę na drodzę i ulega lekkim uszkodzeniom",
        found: LootToFound.CAR_HEALTH_LOOSE
    },
    {
        type: EventTypes.ENCOUNTER,
        chance: 20,
        name: "Wędrowiec",
        text: "Spotykasz dziwnego wędrowca.",
        found: LootToFound.WATER_FOOD
    },
    {
        type: EventTypes.ENCOUNTER,
        chance: 5,
        name: "Ranczo Skywalkerów",
        text: "Ranczo Skywalkerów? WTF ??!!",
        found: LootToFound.WATER_FOOD
    },
    {
        type: EventTypes.ENCOUNTER,
        chance: 5,
        name: "Statek UFO",
        text: "Znajdujesz statek UFO.",
        found: LootToFound.WATER_FOOD_SCRAP
    },
    {
        type: EventTypes.ENCOUNTER,
        chance: 40,
        name: "Znajdujesz złom",
        text: "Znajdujesz trochę złomu.",
        found: LootToFound.SCRAP
    },
    {
        type: EventTypes.ENCOUNTER,
        chance: 40,
        name: "Znajdujesz wodę",
        text: "Znajdujesz trochę wody.",
        found: LootToFound.WATER
    },
    {
        type: EventTypes.ENCOUNTER,
        chance: 40,
        name: "Znajdujesz jedzenie",
        text: "Znajdujesz trochę jedzenia.",
        found: LootToFound.FOOD
    },
];
