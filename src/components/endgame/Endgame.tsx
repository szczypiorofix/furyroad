import React from 'react';
import { connect } from 'react-redux';

import './Endgame.css';

import { MainMenuButton } from '../mainmenubutton/MainMenuButton';
import { EndGameProps } from './EndgameModel';
import { GameRootState } from '../../models';
import { getGameMode, getGameStats } from '../../redux/selectors';
import { goToMainMenu } from '../../redux/actions';


export class Endgame extends React.Component<EndGameProps, {}> {
    
    render():JSX.Element {
        let distanceState:string = "Przejechałeś dystans "+this.props.stats.distanceDriven.toFixed(2)+" km.";
        let fuelState:string = this.props.stats.fuel <= 0 ? "Skończyło ci się paliwo." : "Zostało ci "+this.props.stats.fuel.toFixed(2)+" L paliwa.";
        let waterState:string = this.props.stats.water <= 0 ? "Skończyła ci się woda pitna." : "Zostało ci "+this.props.stats.water.toFixed(2)+" jednostek wody.";
        let foodState:string = this.props.stats.food <= 0 ? "Skończyło ci się pożywienie." : "Zostało ci "+this.props.stats.food.toFixed(2)+" jednostek pożywienia.";
        let carHealthState:string = "Stan techniczny: "+this.props.stats.carHealth+"/"+this.props.stats.carMaxHealth;

        return (
            <React.Fragment>
                <div className="endgame-div">
                    <MainMenuButton
                        title="MENU GŁÓWNE"
                        active={ true }
                        onClick={ () => this.props.gotoMainMenu() }
                    />
                    <h1>KONIEC GRY !!!</h1>
                    <p>{distanceState}</p>
                    <p>{fuelState}</p>
                    <p>{waterState}</p>
                    <p>{foodState}</p>
                    <h2>Interceptor:</h2>
                    <p>{carHealthState}</p>
                </div>
            </React.Fragment>
        );
    }
}


const mapStateToProps = (state:GameRootState) => ({
    mainState:  getGameMode(state),
    stats: getGameStats(state)
});


const mapDispatchToProps = (dispatch:any) => ({
    gotoMainMenu: () => dispatch(goToMainMenu())
});


export default connect(mapStateToProps, mapDispatchToProps)(Endgame);
