import React from 'react';
import { connect } from 'react-redux';

import MainMenu from '../mainmenu/MainMenu';
// import MainGame from '../maingame/MainGame';

import { getGameMode } from '../../redux/selectors';
import { GameState } from '../../models';


interface GameModeProps {
    gameMode?: string
}

export class Game extends React.Component<GameModeProps, {}> {

    render():JSX.Element {

        return (
            <MainMenu />
        )        
    }
}

const mapStateToProps = (state: GameState) => ({
    gameMode: getGameMode(state),
 });
 
const mapDispatchToProps = (dispatch: any) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Game);
