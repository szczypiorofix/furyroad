import React from "react";

import "./GameMap.scss";

import { faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MainMenuButton } from "../../mainmenubutton/MainMenuButton";
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
        <MainMenuButton
          title={""}
          active={true}
          onClick={() => {
            console.log("MAPA");
          }}
        >
          <FontAwesomeIcon icon={faTimes} />
        </MainMenuButton>
        <img src="./images/map.png" alt="game map" />
      </div>
    );
  }
}

export default GameMap;
