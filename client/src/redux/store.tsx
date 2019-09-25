import { IGameStats } from "furyroad-interfaces";
import moment from "moment";
import { AnyAction, createStore, Middleware, Store } from "redux";
import { createLogger } from "redux-logger";
import { IGameRootState, MainGameStateTypes } from "../models";
import initialState from "./initialstate";
import myCombinedReducers from "./reducers";

export const saveGameState = (email: string, uuid: string, stats: IGameStats) => {
  if (uuid !== "") {
    fetch("/api/users", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        uuid,
        stats,
      }),
    }).then(res => {
      console.log("Response status: " + res.status);
      res.json();
    });
    console.log(moment().format("dddd, MMMM Do YYYY, h:mm:ss"));
    console.log("Game saved successfully");
  }
};

const configureStore = (mid: Middleware[]): Store<IGameRootState, AnyAction> => {
  const newStore: Store<IGameRootState, AnyAction> = createStore<IGameRootState, any, any, any>(
    myCombinedReducers,
    {
      savedstate: initialState.savedstate,
      mainmenustate: {
        mode: MainGameStateTypes.SPLASHSCREEN,
      },
    },
    // applyMiddleware(...mid),
  );
  return newStore;
};

let middleware: Middleware[] = [];
if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  const logger = createLogger({
    diff: true,
  });
  middleware = [...middleware, logger];
}

// DO NOT SAVE EVERY STORE CHANGE TO MONGODB !!!
const store: Store<IGameRootState, AnyAction> = configureStore(middleware);
// store.subscribe(() => saveGameState(
//   store.getState().savedstate.gamelogin.email,
//   store.getState().savedstate.gamelogin.uuid,
//   store.getState().savedstate.gamestats)
// );

export default store;
