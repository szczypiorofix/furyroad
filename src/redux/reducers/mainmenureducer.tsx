import { Reducer } from 'redux';
import { MainMenuModeAction, MainMenuMode } from '../actions';
import { MainGameStateTypes, MainMenuState } from '../../models';
import initialState from '../initialstate';


const mainMenuButtonClickedReducer: Reducer<MainMenuState, MainMenuModeAction> = ( state: MainMenuState = initialState.mainmenustate, action: MainMenuModeAction): MainMenuState => {
    switch (action.type) {
        case MainMenuMode.MMM_NEWGAME:            
            return { mode: MainGameStateTypes.NEW_GAME };
        case MainMenuMode.MMM_JUNKYARD:
            return { mode: MainGameStateTypes.JUNKYARD };
        case MainMenuMode.MMM_MAINMENU:
            return { mode: MainGameStateTypes.MAIN_MENU };
        case MainMenuMode.MMM_SETTINGS:
            return { mode: MainGameStateTypes.SETTINGS };
        case MainMenuMode.MMM_CONTINUE:
            return { mode: MainGameStateTypes.CONTINUE };
        case MainMenuMode.MMM_ENDGAME:
            return { mode: MainGameStateTypes.ENDGAME };
        default:
            return state;
    }
}

export default mainMenuButtonClickedReducer;
