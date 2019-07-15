import React from 'react';

import './MainMenu.css';
import { MainMenuButton } from '../mainmenubutton/MainMenuButton';



export class MainMenu extends React.Component<{}, {}> {

    canContinue:boolean = false;

    readR(text:string) {
        return {type: 'string', text};
    }

    render():JSX.Element {
        // console.log("CURRENT GAME MODE: " + this.props.gameMode);
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
                                onClick={ () => console.log(this.readR("dupa")) }
                            />
                            <MainMenuButton
                                title="Śmietnisko"
                                active={true}
                                onClick={ () => console.log("JUNKYARD!") }
                            />
                            <MainMenuButton
                                title="Ustawienia"
                                active={true}
                                onClick={ () => console.log("SETTINGS!") }  // this.goToSettings()
                            />
                        </div>
                    </div>                    
                </div>
            </React.Fragment>
        )
    }
}
