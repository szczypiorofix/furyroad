import React from "react";

import "./GameMap.scss";

import { IGameMapModel } from "./GameMapModel";

class GameMap extends React.Component<{}, IGameMapModel> {
  public componentDidMount() {
    this.setState({
      mapVisible: false,
    });
  }
  public render() {
    return (
      <div className="main-view-map">
        <img src="./images/map.png" alt="game map" />
      </div>
    );
  }
}

export default GameMap;
