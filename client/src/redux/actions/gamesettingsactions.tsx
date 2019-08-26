import { action } from 'typesafe-actions'



export enum GameSettingsActions {
    MUSIC_TOGGLE  = "MUSIC_TOGGLE",
    CONTINUE_GAME_TOGGLE = "CONTINUE_GAME_TOGGLE",
    SET_MUSIC_VOLUME="SET_MUSIC_VOLUME"
}

export interface GameSettingsActionMusicToggle {
    readonly type: GameSettingsActions.MUSIC_TOGGLE;
    payload: boolean
}

export interface GameSettingsActionContinueGameToggle {
    readonly type: GameSettingsActions.CONTINUE_GAME_TOGGLE;
    payload: boolean
}

export interface GameSettingsActionSetMusicVolume {
    readonly type: GameSettingsActions.SET_MUSIC_VOLUME;
    payload: number
}

export type GameSettingsAction = GameSettingsActionMusicToggle | GameSettingsActionContinueGameToggle | GameSettingsActionSetMusicVolume;



export const toggleMusic = (v:boolean) => action(GameSettingsActions.MUSIC_TOGGLE, v);

export const toggleContinueGame = (v:boolean) => action(GameSettingsActions.CONTINUE_GAME_TOGGLE, v);

export const setMusicVolume = (v:number) => action(GameSettingsActions.SET_MUSIC_VOLUME, v);
