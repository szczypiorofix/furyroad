import React from 'react';
import './MainMenu.css';
import MainMenuButton from '../mainmenubutton/MainMenuButton';


export default class MainMenu extends React.Component<{}, {}> {

    render():JSX.Element {
        return (
            <React.Fragment>
                <div className="mainmenu-bg">
                    <div className="mainmenu-content">
                        <h1>FURY ROAD</h1>
                        <MainMenuButton title="Nowa gra"/>
                    </div>                    
                </div>
            </React.Fragment>
        )
    }

}
