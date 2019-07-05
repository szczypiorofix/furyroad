import React from 'react';
import './MainMenuButton.css';
import {MainMenuButtonModel} from './MainMenuButtonModel';




export default class MainMenuButton extends React.Component<MainMenuButtonModel, {}> {

    render():JSX.Element {
        return (
            <button>{this.props.title}</button>
        )
    }

}
