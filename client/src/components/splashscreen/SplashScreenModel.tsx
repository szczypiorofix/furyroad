import { GameLogin } from "../../models";

export interface SplashScreenProps {
    gotoMainMenu: () => void,
    login: (gameLogin: GameLogin) => void,
    logout: (gameLogin: GameLogin) => void,
    setOffline: (v: boolean) => void,
    getLogin: GameLogin
}


export interface SplashScreenState {
    loginPopupVisible: boolean,
    changeLogVisible: boolean,
}