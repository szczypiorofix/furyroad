import { EventResults, EventTypes, IGameEvent } from "furyroad-interfaces";

export const initialGameEvent: IGameEvent = {
  type: EventTypes.START_GAME,
  name: "Game start",
  chance: 100,
  text: "Starting game...",
  attackRate: 0,
  defenseRate: 0,
  options: { yesbutton: "", nobutton: "" },
  result: { succ: [{ res: EventResults.NONE, value: 0 }], fail: [{ res: EventResults.NONE, value: 0 }] },
};

export const historyEventsMaxList: number = 20;

export const GameEvents: IGameEvent[] = [
  {
    type: EventTypes.TERRAIN,
    chance: 60,
    name: "Piaszczysta droga",
    text: "Wkraczasz na piaszczystą drogę",
    attackRate: 0,
    defenseRate: 0,
    options: { yesbutton: "", nobutton: "" },
    result: {
      succ: [{ res: EventResults.NONE, value: 0 }],
      fail: [{ res: EventResults.NONE, value: 0 }],
    },
  },
  {
    type: EventTypes.TERRAIN,
    chance: 50,
    name: "Twarda ubita droga",
    text: "Wkraczasz na ubitą drogę",
    attackRate: 0,
    defenseRate: 0,
    options: { yesbutton: "", nobutton: "" },
    result: {
      succ: [{ res: EventResults.NONE, value: 0 }],
      fail: [{ res: EventResults.NONE, value: 0 }],
    },
  },
  {
    type: EventTypes.TERRAIN,
    chance: 30,
    name: "Błotnista droga",
    text: "Wkraczasz na błotnistą drogę",
    attackRate: 0,
    defenseRate: 0,
    options: { yesbutton: "", nobutton: "" },
    result: {
      succ: [{ res: EventResults.NONE, value: 0 }],
      fail: [{ res: EventResults.NONE, value: 0 }],
    },
  },
  {
    type: EventTypes.TERRAIN,
    chance: 20,
    name: "Kamienista droga",
    text: "Wkraczasz na kamienistą drogę",
    attackRate: 0,
    defenseRate: 0,
    options: { yesbutton: "", nobutton: "" },
    result: {
      succ: [{ res: EventResults.NONE, value: 0 }],
      fail: [{ res: EventResults.NONE, value: 0 }],
    },
  },

  {
    type: EventTypes.FIGHT,
    chance: 30,
    name: "Sfora zdziczałych psów",
    text: "Dopadła Cię sfora zdziczałych psów, musisz się bronić",
    attackRate: 2,
    defenseRate: 0,
    options: { yesbutton: "Walcz!", nobutton: "Uciekaj" },
    result: {
      succ: [{ res: EventResults.NONE, value: 0 }],
      fail: [{ res: EventResults.LOOSE_CAR_HEALTH, value: -Math.round(Math.random() * 5 + 5) }],
    },
  },
  {
    type: EventTypes.FIGHT,
    chance: 25,
    name: "Sępy",
    text: "Dopadła Cię stado wygłodniałych sępów",
    attackRate: 1,
    defenseRate: 0,
    options: { yesbutton: "Walcz! (Atak 1)", nobutton: "Uciekaj" },
    result: {
      succ: [{ res: EventResults.NONE, value: 0 }],
      fail: [{ res: EventResults.LOOSE_CAR_HEALTH, value: -Math.round(Math.random() * 5 + 5) }],
    },
  },
  {
    type: EventTypes.FIGHT,
    chance: 20,
    name: "Gang Czach",
    text: "Dopadł Cię gang Czach. Musisz się bronić.",
    attackRate: 4,
    defenseRate: 2,
    options: { yesbutton: "Walcz! (Atak 4)", nobutton: "Uciekaj" },
    result: {
      succ: [
        { res: EventResults.FOUND_FUEL, value: Math.round(Math.random() * 8 + 2) },
        { res: EventResults.FOUND_SCRAP, value: Math.round(Math.random() * 18 + 2) },
      ],
      fail: [{ res: EventResults.LOOSE_CAR_HEALTH, value: -Math.round(Math.random() * 10 + 5) }],
    },
  },
  {
    type: EventTypes.FIGHT,
    chance: 35,
    name: "Bandyci",
    text: "Dopadli Cię bandyci.",
    attackRate: 3,
    defenseRate: 2,
    options: { yesbutton: "Walcz! (Atak 3)", nobutton: "Uciekaj" },
    result: {
      succ: [
        { res: EventResults.FOUND_FUEL, value: Math.round(Math.random() * 8 + 2) },
        { res: EventResults.FOUND_SCRAP, value: Math.round(Math.random() * 18 + 2) },
        { res: EventResults.FOUND_WATER, value: Math.round(Math.random() * 6 + 2) },
      ],
      fail: [
        { res: EventResults.LOOSE_CAR_HEALTH, value: -Math.round(Math.random() * 10 + 5) },
        { res: EventResults.LOOSE_FUEL, value: -Math.round(Math.random() * 5 + 5) },
      ],
    },
  },
  {
    type: EventTypes.FIGHT,
    chance: 30,
    name: "Gang Kopaczy",
    text: "Dopadł Cię gang Kopaczy.",
    attackRate: 5,
    defenseRate: 4,
    options: { yesbutton: "Walcz! (Atak 5)", nobutton: "Uciekaj" },
    result: {
      succ: [
        { res: EventResults.FOUND_FUEL, value: Math.round(Math.random() * 8 + 2) },
        { res: EventResults.FOUND_SCRAP, value: Math.round(Math.random() * 18 + 2) },
        { res: EventResults.FOUND_WATER, value: Math.round(Math.random() * 12 + 2) },
        { res: EventResults.FOUND_FOOD, value: Math.round(Math.random() * 12 + 2) },
      ],
      fail: [{ res: EventResults.LOOSE_CAR_HEALTH, value: -Math.round(Math.random() * 10 + 5) }],
    },
  },
  {
    type: EventTypes.FIGHT,
    chance: 10,
    name: "Immortan Joe",
    text: "Ściga Cię sam Immortan Joe! Broń się!",
    attackRate: 6,
    defenseRate: 6,
    options: { yesbutton: "Walcz! (Atak 6)", nobutton: "Uciekaj" },
    result: {
      succ: [
        { res: EventResults.FOUND_FUEL, value: Math.round(Math.random() * 8 + 2) },
        { res: EventResults.FOUND_SCRAP, value: Math.round(Math.random() * 18 + 2) },
        { res: EventResults.FOUND_WATER, value: Math.round(Math.random() * 12 + 2) },
        { res: EventResults.FOUND_FOOD, value: Math.round(Math.random() * 12 + 2) },
      ],
      fail: [{ res: EventResults.LOOSE_CAR_HEALTH, value: -Math.round(Math.random() * 10 + 5) }],
    },
  },

  {
    type: EventTypes.ENCOUNTER,
    chance: 80,
    name: "Dziura w jezdni",
    text: "Interceptor wpada w dziurę na drodzę i ulega lekkim uszkodzeniom",
    attackRate: 0,
    defenseRate: 0,
    options: { yesbutton: "Postaraj się ominąć", nobutton: "Przejedź" },
    result: {
      succ: [],
      fail: [{ res: EventResults.LOOSE_CAR_HEALTH, value: -Math.round(Math.random() * 8 + 2) }],
    },
  },
  {
    type: EventTypes.ENCOUNTER,
    chance: 20,
    name: "Wędrowiec",
    text: "Spotykasz dziwnego wędrowca.",
    attackRate: 0,
    defenseRate: 0,
    options: { yesbutton: "Przywitaj się", nobutton: "Odjedź" },
    result: {
      succ: [{ res: EventResults.FOUND_WATER, value: Math.round(Math.random() * 8 + 2) }],
      fail: [{ res: EventResults.NONE, value: 0 }],
    },
  },
  {
    type: EventTypes.ENCOUNTER,
    chance: 15,
    name: "Wywrócona cysterna",
    text: "Trafiasz na wywróconą na drodze cysternę",
    attackRate: 0,
    defenseRate: 0,
    options: { yesbutton: "Sprawdź", nobutton: "Jedź dalej" },
    result: {
      succ: [{ res: EventResults.FOUND_WATER, value: Math.round(Math.random() * 8 + 2) }],
      fail: [{ res: EventResults.NONE, value: 0 }],
    },
  },
  {
    type: EventTypes.ENCOUNTER,
    chance: 15,
    name: "Stara farma",
    text: "Znajdujesz nieopodal starą farmę. Wygląda na opuszczoną.",
    attackRate: 0,
    defenseRate: 0,
    options: { yesbutton: "Sprawdź", nobutton: "Jedź dalej" },
    result: {
      succ: [{ res: EventResults.FOUND_SCRAP, value: Math.round(Math.random() * 16 + 2) }],
      fail: [{ res: EventResults.NONE, value: 0 }],
    },
  },
  {
    type: EventTypes.ENCOUNTER,
    chance: 15,
    name: "Wrak samochodu",
    text: "Trafiasz na wrak samochodu. Może znajdziesz coś ciekawego.",
    attackRate: 0,
    defenseRate: 0,
    options: { yesbutton: "Sprawdź", nobutton: "Jedź dalej" },
    result: {
      succ: [{ res: EventResults.FOUND_SCRAP, value: Math.round(Math.random() * 16 + 2) }],
      fail: [{ res: EventResults.NONE, value: 0 }],
    },
  },
  {
    type: EventTypes.ENCOUNTER,
    chance: 15,
    name: "Burza piaskowa",
    text: "Nieopodal rozpętała się burza pisakowa.",
    attackRate: 0,
    defenseRate: 0,
    options: { yesbutton: "Poszukaj schronienia", nobutton: "Jedź dalej" },
    result: {
      succ: [{ res: EventResults.NONE, value: 0 }],
      fail: [{ res: EventResults.LOOSE_CAR_HEALTH, value: Math.round(Math.random() * 25 + 5) }],
    },
  },
  {
    type: EventTypes.ENCOUNTER,
    chance: 15,
    name: "Wiatraki",
    text: "Napotykasz farmę wiatraków. Wygląda na to, że dawno tu nikogo nie było.",
    attackRate: 0,
    defenseRate: 0,
    options: { yesbutton: "Sprawdź", nobutton: "Jedź dalej" },
    result: {
      succ: [{ res: EventResults.NONE, value: 0 }],
      fail: [{ res: EventResults.NONE, value: 0 }],
    },
  },
];
