import React from 'react';
import { connect } from 'react-redux';

import MainMenu from '../mainmenu/MainMenu';
import MainGame from '../maingame/MainGame';
import Junkyard from '../junkyard/Junkyard';
import Settings from '../settings/Settings';
import Endgame  from '../endgame/Endgame';
import MusicBox from '../musicbox/MusicBox';
import SplashScreen from '../splashscreen/SplashScreen';

import { getGameMode, getGameSettings } from '../../redux/selectors';
import { GameProps } from './GameModel';
import { GameRootState, MainGameStateTypes } from '../../models';



export class Game extends React.Component<GameProps, {}> {

    render():JSX.Element {
        
        switch (this.props.gameMode.mode) {
            case MainGameStateTypes.MAIN_MENU:
                return  <React.Fragment>
                            <MusicBox />
                            <MainMenu />
                        </React.Fragment>;
            case MainGameStateTypes.NEW_GAME:
                return  <React.Fragment>
                            <MusicBox />
                            <MainGame />
                        </React.Fragment>;
            case MainGameStateTypes.JUNKYARD:
                return  <React.Fragment>
                            <MusicBox />
                            <Junkyard />
                        </React.Fragment>;
            case MainGameStateTypes.SETTINGS:
                return  <React.Fragment>
                            <MusicBox />
                            <Settings />
                        </React.Fragment>;
            case MainGameStateTypes.CONTINUE:
                return  <React.Fragment>
                            <MusicBox />
                            <MainGame />
                        </React.Fragment>;
            case MainGameStateTypes.ENDGAME:
                return  <React.Fragment>
                            <MusicBox />
                            <Endgame />
                        </React.Fragment>;
            default:
                return <SplashScreen />;        
        }
    }
}

const mapStateToProps = (state: GameRootState) => ({
    gameMode:  getGameMode(state),
    gameSettings: getGameSettings(state)
 });
 
const mapDispatchToProps = (dispatch:any) => ({
    
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);