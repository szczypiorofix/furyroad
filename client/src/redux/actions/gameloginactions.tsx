import { action } from 'typesafe-actions'
import { GameLogin } from '../../models';

export enum GameLoginActions {
    LOGIN  = "LOGIN",
    LOGOUT = "LOGOUT"
}

export interface GameLoginActionLogin {
    readonly type: GameLoginActions.LOGIN;
    payload: {
        gameLogin: GameLogin
    }
}

export interface GameLoginActionLogout {
    readonly type: GameLoginActions.LOGOUT;
    payload: {
        gameLogin: GameLogin
    }
}

export type GameLoginAction = GameLoginActionLogin | GameLoginActionLogout;

export const login = (gameLogin: GameLogin) => action(GameLoginActions.LOGIN, { gameLogin });

export const logout = (gameLogin: GameLogin) => action(GameLoginActions.LOGOUT, { gameLogin });
