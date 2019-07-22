import React from 'react';
import { connect } from 'react-redux';

import MainMenu from '../mainmenu/MainMenu';
import MainGame from '../maingame/MainGame';
import Junkyard from '../junkyard/Junkyard';
import Settings from '../settings/Settings';
import Endgame  from '../endgame/Endgame';

import { getGameMode } from '../../redux/selectors';
import { GameProps } from './GameModel';
import { GameRootState, MainGameStateTypes } from '../../models';


export class Game extends React.Component<GameProps, {}> {

    render():JSX.Element {        
        switch (this.props.gameMode.mode) {
            case MainGameStateTypes.MAIN_MENU:
                return <MainMenu />
            case MainGameStateTypes.NEW_GAME:
                return <MainGame />
            case MainGameStateTypes.JUNKYARD:
                return <Junkyard />
            case MainGameStateTypes.SETTINGS:
                return <Settings />
            case MainGameStateTypes.CONTINUE:
                return <MainGame />
            case MainGameStateTypes.ENDGAME:
                return <Endgame />
            default:
                return <MainMenu />
        }
    }
}

const mapStateToProps = (state: GameRootState) => ({
    gameMode:  getGameMode(state)
 });
 
const mapDispatchToProps = (dispatch:any) => ({
    
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);