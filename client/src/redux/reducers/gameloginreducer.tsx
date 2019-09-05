import { Reducer } from 'redux';
import { GameLoginAction, GameLoginActions } from '../actions';
import { GameLogin } from '../../models';


const gameLoginReducer: Reducer<GameLogin, GameLoginAction> = ( state: GameLogin = {email: "", uuid: ""}, action: GameLoginAction): GameLogin => {
    switch(action.type) {
        case GameLoginActions.LOGIN:
            return {...state, email: action.payload.gameLogin.email, uuid: action.payload.gameLogin.uuid}
        case GameLoginActions.LOGOUT:
            return {...state, email: "", uuid: ""}
        default:
            return state;
    }
}

export default gameLoginReducer;
