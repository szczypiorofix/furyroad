import { IGameLogin } from "furyroad-interfaces";
import { Reducer } from "redux";
import { GameLoginAction, GameLoginActions } from "../actions";

const gameLoginReducer: Reducer<IGameLogin, GameLoginAction> = (
  state: IGameLogin = { email: "", uuid: "", password: "" },
  action: GameLoginAction,
): IGameLogin => {
  switch (action.type) {
    case GameLoginActions.LOGIN:
      return { ...state, email: action.payload.gameLogin.email, uuid: action.payload.gameLogin.uuid };
    case GameLoginActions.LOGOUT:
      return { ...state, email: "", uuid: "", password: "" };
    default:
      return state;
  }
};

export default gameLoginReducer;
