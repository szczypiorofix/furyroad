import React from 'react';
import { connect } from 'react-redux';

import './Settings.scss';
import { MainMenuButton } from '../mainmenubutton/MainMenuButton';
import { SettingsProps } from './SettingsModel';
import { getGameMode } from '../../redux/selectors';
import { GameRootState } from '../../models';
import { goToMainMenu } from '../../redux/actions';


export class Settings extends React.Component<SettingsProps, {}> {

    render():JSX.Element {
        
        return (
            <React.Fragment>
                <div className="setting-menu">
                    <MainMenuButton 
                        title="MENU GŁÓWNE"
                        active={ true }
                        onClick={ () => this.props.gotoMainMenu() }
                    />
                    <h2 className="settings-title">SETTINGS MENU</h2>
                    <h3>Ustawienia ...</h3>
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

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
