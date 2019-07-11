import React from 'react';
import { connect } from 'react-redux';

import MainMenu from '../mainmenu/MainMenu';
import MainGame from '../maingame/MainGame';
import Junkyard from '../junkyard/Junkyard';

import { getGameMode } from '../../redux/selectors';
import { GameState, GameStateTypes } from '../../models';


interface GameModeProps {
    gameMode: GameStateTypes
}

export class Game extends React.Component<GameModeProps, {}> {

    render():JSX.Element {
        switch(this.props.gameMode) {
            case GameStateTypes.NEW_GAME:
                return <MainGame />
            case GameStateTypes.MAIN_MENU:
                return <MainMenu />
            case GameStateTypes.JUNKYARD:
                return <Junkyard />
            default:
                return <MainMenu />
        }      
    }
}

const mapStateToProps = (state: GameState) => ({
    gameMode: getGameMode(state),
 });
 
const mapDispatchToProps = (dispatch: any) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
