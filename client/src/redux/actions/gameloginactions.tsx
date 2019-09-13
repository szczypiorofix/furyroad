import { IGameLogin } from "furyroad-interfaces";
import { action } from "typesafe-actions";

export enum GameLoginActions {
  LOGIN = "LOGIN",
  LOGOUT = "LOGOUT",
}

export interface IGameLoginActionLogin {
  readonly type: GameLoginActions.LOGIN;
  payload: {
    gameLogin: IGameLogin;
  };
}

export interface IGameLoginActionLogout {
  readonly type: GameLoginActions.LOGOUT;
  payload: {
    gameLogin: IGameLogin;
  };
}

export type GameLoginAction = IGameLoginActionLogin | IGameLoginActionLogout;

export const login = (gameLogin: IGameLogin) => action(GameLoginActions.LOGIN, { gameLogin });

export const logout = (gameLogin: IGameLogin) => action(GameLoginActions.LOGOUT, { gameLogin });
