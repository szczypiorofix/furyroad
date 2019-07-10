import React from 'react';

import './MainMenuButton.css';
import { MainMenuButtonModel } from '../../models';



export class MainMenuButton extends React.Component<MainMenuButtonModel, {}> {

    render():JSX.Element {
        return (
            <button 
                style={this.props.active ? {visibility:'visible'} : {visibility:'hidden'}}
                onClick={ () => this.props.onClick() }
                >
                {this.props.title}
            </button>
        )
    }
}
