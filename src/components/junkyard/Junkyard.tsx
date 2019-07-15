import React from 'react';

import './Junkyard.css';
import {MainMenuButton} from '../mainmenubutton/MainMenuButton';



export class Junkyard extends React.Component<{}, {}> {

    canContinue:boolean = false;

    render():JSX.Element {
        
        return (
            <React.Fragment>
                <h2 className="junkyard-title">THIS IS JUNKYARD MENU</h2>
                <h3>Śmietnisko - to tutaj składowane są bezużyteczne, martwe roboty</h3>
                <MainMenuButton 
                    title="MENU GŁÓWNE"
                    active={ true }
                    onClick={ () => {} }
                />
            </React.Fragment>
        )
    }
}
