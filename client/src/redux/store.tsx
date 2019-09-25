import { ISavedState } from "furyroad-interfaces";
import { AnyAction, applyMiddleware, createStore, Middleware, Store } from "redux";
import { createLogger } from "redux-logger";
import { IGameRootState, MainGameStateTypes } from "../models";
import initialState from "./initialstate";
import myCombinedReducers from "./reducers";

export const LOCAL_STORAGE_SAVED_STATE_NAME: string = "gameSavedState";

export const saveGameState = (savedState: ISavedState) => {
  // const serializedSavedState = JSON.stringify(savedState);
  // localStorage.setItem("gameSavedState", serializedSavedState);

  console.log("game saved");
};

function configureStore(mid: Middleware[]): Store<IGameRootState, AnyAction> {
  const newStore: Store<IGameRootState, AnyAction> = createStore<IGameRootState, any, any, any>(
    myCombinedReducers,
    {
      savedstate: initialState.savedstate,
      mainmenustate: {
        mode: MainGameStateTypes.SPLASHSCREEN,
      },
    },
    applyMiddleware(...mid),
  );
  return newStore;
}

let middleware: Middleware[] = [];
if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  const logger = createLogger({
    diff: true,
  });
  middleware = [...middleware, logger];
}

const store: Store<IGameRootState, AnyAction> = configureStore(middleware);
store.subscribe(() => saveGameState(store.getState().savedstate));

export default store;
