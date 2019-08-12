import React from 'react';
import { connect } from 'react-redux';

import './SplashScreen.scss';

import { GameRootState } from '../../models';
import { goToMainMenu } from '../../redux/actions';
import { MainMenuButton } from '../mainmenubutton/MainMenuButton';


interface SplashScreenProps {
    gotoMainMenu: () => void
}


export class SplashScreen extends React.Component<SplashScreenProps, {}> {

    render():JSX.Element {
        return (
            <React.Fragment>
                <div className="splash-screen-main">
                    <h1>FURY ROAD...</h1>
                    <MainMenuButton
                        title="START"
                        active={ true }
                        onClick={ () => {
                            this.props.gotoMainMenu();
                        } }
                    />
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = (state:GameRootState) => ({

});
 
const mapDispatchToProps = (dispatch:any) => ({
    gotoMainMenu: () => dispatch(goToMainMenu()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
