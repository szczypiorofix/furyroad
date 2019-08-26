import React from 'react';

import './GameMap.scss';

import { GameMapModel } from './GameMapModel';



class GameMap extends React.Component< {}, GameMapModel > {

    componentWillMount() {
        this.setState({
            mapVisible: false
        });
    }

    render() {
        return (
            <div className="main-view-map">
                <img src="./images/map.png" alt="game map" />
            </div>
        );
    }

}


export default GameMap;