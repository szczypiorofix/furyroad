import { Reducer } from 'redux';
import { GameSettingsAction, GameSettingsActions } from '../actions';
import { GameSettings } from '../../models';


const gameSettingsReducer: Reducer<GameSettings, GameSettingsAction> = ( state: GameSettings = {musicOn:false, musicVolume: 50, canContinue: false}, action: GameSettingsAction): GameSettings => {
    switch(action.type) {
        case GameSettingsActions.MUSIC_TOGGLE:
            return {...state, musicOn:  action.payload}
        case GameSettingsActions.CONTINUE_GAME_TOGGLE:
            return {...state, canContinue: action.payload}
        case GameSettingsActions.SET_MUSIC_VOLUME:
            return {...state, musicVolume: action.payload}
        default:
            return state;
    }
}

export default gameSettingsReducer;
