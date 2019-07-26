import React from 'react';
import { connect } from 'react-redux';

import './Junkyard.scss';
import { MainMenuButton } from '../mainmenubutton/MainMenuButton';
import { JunkyardProps } from './JunkyardModel';
import { getGameMode } from '../../redux/selectors';
import { GameRootState } from '../../models';
import { goToMainMenu } from '../../redux/actions';


export class Junkyard extends React.Component<JunkyardProps, {}> {

    render():JSX.Element {
        
        return (
            <React.Fragment>
                <div className="junkyard-menu">
                    <MainMenuButton 
                        title="MENU GŁÓWNE"
                        active={ true }
                        onClick={ () => this.props.gotoMainMenu() }
                    />
                    <h2 className="junkyard-title">THIS IS JUNKYARD MENU</h2>
                    <h3>Śmietnisko - to tutaj składowane są bezużyteczne, martwe roboty</h3>
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state:GameRootState) => ({
    gameMode:  getGameMode(state)
 });
 
const mapDispatchToProps = (dispatch:any) => ({
    gotoMainMenu: () => dispatch(goToMainMenu()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Junkyard);
