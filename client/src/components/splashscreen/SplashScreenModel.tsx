import { GameLogin } from "../../models";

export interface SplashScreenProps {
    gotoMainMenu: () => void,
    login: (gameLogin: GameLogin) => void,
    logout: (gameLogin: GameLogin) => void,
    setOffline: (v: boolean) => void,
    getLogin: GameLogin
}

export interface IChangeLogContent {
    _id: string;
    date: number;
    text: string;
}


export interface SplashScreenState {
    loginPopupVisible: boolean,
    changeLogVisible: boolean,
    changeLogContent: IChangeLogContent[],
}