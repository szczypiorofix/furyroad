import { Reducer } from 'redux';
import { MainMenuActions, MainMenuAction } from '../actions';
import { MainGameStateTypes, MainMenuState } from '../../models';
import initialState from '../initialstate';


const mainMenuButtonClickedReducer: Reducer<MainMenuState, MainMenuAction> = ( state: MainMenuState = initialState.mainmenustate, action: MainMenuAction): MainMenuState => {
    switch (action.type) {
        case MainMenuActions.MM_NEWGAME:            
            return { mode: MainGameStateTypes.NEW_GAME };
        case MainMenuActions.MM_JUNKYARD:
            return { mode: MainGameStateTypes.JUNKYARD };
        case MainMenuActions.MM_MAINMENU:
            return { mode: MainGameStateTypes.MAIN_MENU };
        case MainMenuActions.MM_SETTINGS:
            return { mode: MainGameStateTypes.SETTINGS };
        case MainMenuActions.MM_CONTINUE:
            return { mode: MainGameStateTypes.CONTINUE };
        case MainMenuActions.MM_ENDGAME:
            return { mode: MainGameStateTypes.ENDGAME };
        case MainMenuActions.MM_SPLASHSCREEN:
            return { mode: MainGameStateTypes.SPLASHSCREEN };
        default:
            return state;
    }
}

export default mainMenuButtonClickedReducer;
