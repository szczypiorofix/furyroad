
export enum EventTypes {
    START_GAME,
    VILLAGE,
    FIGHT,
    ENCOUNTER,
    TERRAIN
}

export interface GameEvent {
    type:    EventTypes,
    name:    string,
    chance:  number, // x / 100 to appear
    text:    string
}

export const GameEvents:GameEvent[] = [
    {
        type: EventTypes.TERRAIN,
        chance: 60,
        name: "Piaszczysta droga",
        text: "Wkraczasz na piaszczystą drogę"
    },
    {
        type: EventTypes.TERRAIN,
        chance: 50,
        name: "Twarda ubita droga",
        text: "Wkraczasz na ubitą drogę"
    },
    {
        type: EventTypes.TERRAIN,
        chance: 30,
        name: "Błotnista droga",
        text: "Wkraczasz na błotnistą drogę"
    },
    {
        type: EventTypes.TERRAIN,
        chance: 20,
        name: "Kamienista droga",
        text: "Wkraczasz na kamienistą drogę"
    },


    {
        type: EventTypes.FIGHT,
        chance: 40,
        name: "Walka z bandytami",
        text: "Zauważasz grupę bandytów którzy Cię atakują"
    },
    {
        type: EventTypes.FIGHT,
        chance: 30,
        name: "Sfora zdziczałych psów",
        text: "Dopadła Cię sfora zdziczałych psów, musisz się bronić"
    },
    {
        type: EventTypes.FIGHT,
        chance: 25,
        name: "Sępy",
        text: "Dopadła Cię stado wygłodniałych sępów"
    },
    {
        type: EventTypes.FIGHT,
        chance: 20,
        name: "Gang Czach",
        text: "Dopadła Cię gang Czach. Musisz się bronić."
    },
    {
        type: EventTypes.FIGHT,
        chance: 10,
        name: "Immortan Joe",
        text: "Ściga Cię sam Immortan Joe! Broń się!"
    },


    {
        type: EventTypes.ENCOUNTER,
        chance: 20,
        name: "Wędrowiec",
        text: "Spotykasz dziwnego wędrowca."
    },
    {
        type: EventTypes.ENCOUNTER,
        chance: 5,
        name: "Ranczo Skywalkerów",
        text: "Ranczo Skywalkerów? WTF ??!!"
    },
    {
        type: EventTypes.ENCOUNTER,
        chance: 5,
        name: "Statek UFO",
        text: "Znajdujesz statek UFO."
    },
];
