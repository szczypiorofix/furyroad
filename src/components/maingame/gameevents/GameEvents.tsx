
export enum EventTypes {
    START_GAME,
    VILLAGE,
    FIGHT,
    ENCOUNTER,
    TERRAIN,
    INFO
}

export enum EventResults {
    NONE,
    FOUND_WATER,
    FOUND_FOOD,
    FOUND_SCRAP,
    FOUND_FUEL,
    ADD_CAR_HEALTH,
    LOOSE_WATER,
    LOOSE_FOOD,
    LOOSE_SCRAP,
    LOOSE_FUEL,
    LOOSE_CAR_HEALTH
}

interface ResultOfEvent {
    res:    EventResults,
    value:  number
}

interface EventOptions {
    yesbutton:  string,
    nobutton:   string
}

export const initialGameEvent:GameEvent = {
    type: EventTypes.START_GAME,
    name: "Game start",
    chance: 100,
    text: "Starting game...",
    attackRate: 0,
    defenseRate: 0,
    options: {yesbutton: "", nobutton: ""},
    result: { succ: [ {res: EventResults.NONE, value: 0 }], fail: [{res: EventResults.NONE, value: 0 }] }
}

export const historyEventsMaxList: number = 20;

export interface GameEvent {
    type:           EventTypes,
    name:           string,
    chance:         number, // x / 100 to appear
    text:           string,
    attackRate:     number,
    defenseRate:    number,
    options:        EventOptions,
    result:         { succ: ResultOfEvent[], fail: ResultOfEvent[] }
}

export const GameEvents:GameEvent[] = [
    {
        type: EventTypes.TERRAIN,
        chance: 60,
        name: "Piaszczysta droga",
        text: "Wkraczasz na piaszczystą drogę",
        attackRate: 0,
        defenseRate: 0,
        options: {yesbutton: "", nobutton: ""},
        result: {
            succ: [{res: EventResults.NONE, value: 0 }],
            fail: [{res: EventResults.NONE, value: 0 }]
        }
    },
    {
        type: EventTypes.TERRAIN,
        chance: 50,
        name: "Twarda ubita droga",
        text: "Wkraczasz na ubitą drogę",
        attackRate: 0,
        defenseRate: 0,
        options: {yesbutton: "", nobutton: ""},
        result: {
            succ: [{res: EventResults.NONE, value: 0 }],
            fail: [{res: EventResults.NONE, value: 0 }]
        }
    },
    {
        type: EventTypes.TERRAIN,
        chance: 30,
        name: "Błotnista droga",
        text: "Wkraczasz na błotnistą drogę",
        attackRate: 0,
        defenseRate: 0,
        options: {yesbutton: "", nobutton: ""},
        result: {
            succ: [{res: EventResults.NONE, value: 0 }],
            fail: [{res: EventResults.NONE, value: 0 }]
        }
    },
    {
        type: EventTypes.TERRAIN,
        chance: 20,
        name: "Kamienista droga",
        text: "Wkraczasz na kamienistą drogę",
        attackRate: 0,
        defenseRate: 0,
        options: {yesbutton: "", nobutton: ""},
        result: {
            succ: [{res: EventResults.NONE, value: 0 }],
            fail: [{res: EventResults.NONE, value: 0 }]
        }
    },


    {
        type: EventTypes.FIGHT,
        chance: 40,
        name: "Walka z bandytami",
        text: "Zauważasz grupę bandytów którzy Cię atakują",
        attackRate: 4,
        defenseRate: 3,
        options: {yesbutton: "Walcz!", nobutton: "Uciekaj"},
        result: {
            succ: [{res: EventResults.FOUND_FUEL, value: Math.round((Math.random() * 10) + 5) }, {res: EventResults.FOUND_SCRAP, value: Math.round((Math.random() * 18) + 2) } ],
            fail: [{res: EventResults.LOOSE_CAR_HEALTH, value: Math.round((Math.random() * 15) + 5) }]
        }
    },
    {
        type: EventTypes.FIGHT,
        chance: 30,
        name: "Sfora zdziczałych psów",
        text: "Dopadła Cię sfora zdziczałych psów, musisz się bronić",
        attackRate: 2,
        defenseRate: 0,
        options: {yesbutton: "Walcz!", nobutton: "Uciekaj"},
        result: {
            succ: [{res: EventResults.NONE, value: 0 }],
            fail: [{res: EventResults.LOOSE_CAR_HEALTH, value: Math.round((Math.random() * 5) + 5) }]
        }
    },
    {
        type: EventTypes.FIGHT,
        chance: 25,
        name: "Sępy",
        text: "Dopadła Cię stado wygłodniałych sępów",
        attackRate: 1,
        defenseRate: 0,
        options: {yesbutton: "Walcz!", nobutton: "Uciekaj"},
        result: {
            succ: [{res: EventResults.NONE, value: 0 }],
            fail: [{res: EventResults.LOOSE_CAR_HEALTH, value: Math.round((Math.random() * 5) + 5) }]
        }
    },
    {
        type: EventTypes.FIGHT,
        chance: 20,
        name: "Gang Czach",
        text: "Dopadł Cię gang Czach. Musisz się bronić.",
        attackRate: 4,
        defenseRate: 2,
        options: {yesbutton: "Walcz!", nobutton: "Uciekaj"},
        result: {
            succ: [{res: EventResults.FOUND_FUEL, value: Math.round((Math.random() * 8) + 2) }, {res: EventResults.FOUND_SCRAP, value: Math.round((Math.random() * 18) + 2) }],
            fail: [{res: EventResults.LOOSE_CAR_HEALTH, value: Math.round((Math.random() * 10) + 5) }]
        }
    },
    {
        type: EventTypes.FIGHT,
        chance: 34,
        name: "Bandyci",
        text: "Dopadli Cię bandyci.",
        attackRate: 3,
        defenseRate: 2,
        options: {yesbutton: "Walcz!", nobutton: "Uciekaj"},
        result: {
            succ: [{res: EventResults.FOUND_FUEL, value: Math.round((Math.random() * 8) + 2) }, {res: EventResults.FOUND_SCRAP, value: Math.round((Math.random() * 18) + 2) }, {res: EventResults.FOUND_WATER, value: Math.round((Math.random() * 6) + 2) }],
            fail: [{res: EventResults.LOOSE_CAR_HEALTH, value: Math.round((Math.random() * 10) + 5) }]
        }
    },
    {
        type: EventTypes.FIGHT,
        chance: 30,
        name: "Gang Kopaczy",
        text: "Dopadł Cię gang Kopaczy.",
        attackRate: 5,
        defenseRate: 4,
        options: {yesbutton: "Walcz!", nobutton: "Uciekaj"},
        result: {
            succ: [{res: EventResults.FOUND_FUEL, value: Math.round((Math.random() * 8) + 2) }, {res: EventResults.FOUND_SCRAP, value: Math.round((Math.random() * 18) + 2) }, {res: EventResults.FOUND_WATER, value: Math.round((Math.random() * 12) + 2) }, {res: EventResults.FOUND_FOOD, value: Math.round((Math.random() * 12) + 2) }],
            fail: [{res: EventResults.LOOSE_CAR_HEALTH, value: Math.round((Math.random() * 10) + 5) }]
        }
    },
    {
        type: EventTypes.FIGHT,
        chance: 10,
        name: "Immortan Joe",
        text: "Ściga Cię sam Immortan Joe! Broń się!",
        attackRate: 6,
        defenseRate: 6,
        options: {yesbutton: "Walcz!", nobutton: "Uciekaj"},
        result: {
            succ: [{res: EventResults.FOUND_FUEL, value: Math.round((Math.random() * 8) + 2) }, {res: EventResults.FOUND_SCRAP, value: Math.round((Math.random() * 18) + 2) }, {res: EventResults.FOUND_WATER, value: Math.round((Math.random() * 12) + 2) }, {res: EventResults.FOUND_FOOD, value: Math.round((Math.random() * 12) + 2) }],
            fail: [{res: EventResults.LOOSE_CAR_HEALTH, value: Math.round((Math.random() * 10) + 5) }]
        }
    },

    {
        type: EventTypes.ENCOUNTER,
        chance: 80,
        name: "Dziura w jezdni",
        text: "Interceptor wpada w dziurę na drodzę i ulega lekkim uszkodzeniom",
        attackRate: 0,
        defenseRate: 0,
        options: {yesbutton: "Omiń", nobutton: "Przejedź"},
        result: {
            succ: [{res: EventResults.LOOSE_CAR_HEALTH, value: Math.round((Math.random() * 8) + 2) }],
            fail: [{res: EventResults.LOOSE_CAR_HEALTH, value: Math.round((Math.random() * 8) + 2) }]
        }
    },
    {
        type: EventTypes.ENCOUNTER,
        chance: 20,
        name: "Wędrowiec",
        text: "Spotykasz dziwnego wędrowca.",
        attackRate: 0,
        defenseRate: 0,
        options: {yesbutton: "Przywitaj się", nobutton: "Odjedź"},
        result: {
            succ: [{res: EventResults.FOUND_WATER, value: Math.round((Math.random() * 8) + 2) }],
            fail: [{res: EventResults.NONE, value: 0 }]
        }
    },
    {
        type: EventTypes.ENCOUNTER,
        chance: 5,
        name: "Ranczo Skywalkerów",
        text: "Ranczo Skywalkerów? WTF ??!!",
        attackRate: 0,
        defenseRate: 0,
        options: {yesbutton: "Sprawdź", nobutton: "Jedź dalej"},
        result: {
            succ: [{res: EventResults.FOUND_WATER, value: Math.round((Math.random() * 8) + 2) }],
            fail: [{res: EventResults.NONE, value: 0 }]
        }
    },
    {
        type: EventTypes.ENCOUNTER,
        chance: 5,
        name: "Statek UFO",
        text: "Znajdujesz statek UFO.",
        attackRate: 0,
        defenseRate: 0,
        options: {yesbutton: "Sprawdź", nobutton: "Jedź dalej"},
        result: {
            succ: [{res: EventResults.FOUND_SCRAP, value: Math.round((Math.random() * 16) + 2) }],
            fail: [{res: EventResults.NONE, value: 0 }]
        }
    }
];
