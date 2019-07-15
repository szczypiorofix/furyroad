import React from 'react';
import { connect } from 'react-redux';

import './MainGame.css';
import {MainMenuButton} from '../mainmenubutton/MainMenuButton';



export class MainGame extends React.Component<{}, {}> {

    canContinue:boolean = false;

    render():JSX.Element {
        if (this.props) {
            return (
                <React.Fragment>
                    <div className="main-game-div">
                        <MainMenuButton
                            title="ZAPIS I WYJŚCIE"
                            active={ true }
                            onClick={ () => {} }
                        />
                        <h1 className="maingame-title">FURY ROAD</h1>
                        <div className="main-view-container">
                            <div className="main-view-left">
                                <div className="statistics-panel">
                                    <span>FUEL</span>
                                    <span>WATER</span>
                                </div>
                            </div>
                            <div className="main-view-middle">
                                <div className="events-panel">
                                    <p>Eventy</p>
                                </div>
                            </div>
                            <div className="main-view-right">
                                <div className="upgrades-panel">
                                    <p>Upgrades</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </React.Fragment>
            )
        }
        else
        return <div>...</div>
    }
}
