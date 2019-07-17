import React from 'react';
import { connect } from 'react-redux';

import './MainMenu.css';
import { MainMenuButton } from '../mainmenubutton/MainMenuButton';
import { GameRootState } from '../../models';
import { getGameMode } from '../../redux/selectors';
import { goToNewGame, goToJunkyard } from '../../redux/actions';
import { MainMenuProps } from './MainMenuModel';



export class MainMenu extends React.Component<MainMenuProps, {}> {

    canContinue:boolean = false;

    render():JSX.Element {
        
        return (
            <React.Fragment>
                <div className="mainmenu-bg">
                    <div className="mainmenu-content">
                        <h1 className="mainmenu-gametitle">FURY ROAD</h1>
                        <div className="buttons-div">
                            <MainMenuButton 
                                title="Kontynuuj"
                                active={ this.canContinue }
                                onClick={ () => console.log("CONTINUE!") }
                            />
                            <MainMenuButton
                                title="Nowa gra"
                                active={true}
                                onClick={ () => this.props.startNewGame() }
                            />
                            <MainMenuButton
                                title="Śmietnisko"
                                active={true}
                                onClick={ () => this.props.gotoJunkyard() }
                            />
                            <MainMenuButton
                                title="Ustawienia"
                                active={true}
                                onClick={ () => console.log("SETTINGS!") }
                            />
                        </div>
                    </div>                    
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state:GameRootState) => ({
    gameMode:  getGameMode(state)
 });
 
const mapDispatchToProps = (dispatch:any) => ({
    startNewGame: () => dispatch(goToNewGame()),
    gotoJunkyard: () => dispatch(goToJunkyard()),
});

export default connect(mapStateToProps, mapDispatchToProps)(MainMenu);
