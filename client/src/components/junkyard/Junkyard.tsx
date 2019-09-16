import React from "react";
import { connect } from "react-redux";

import { IGameRootState } from "../../models";
import { goToMainMenu } from "../../redux/actions";
import { getGameMode } from "../../redux/selectors";
import { MainMenuButton } from "../mainmenubutton/MainMenuButton";
import "./Junkyard.scss";
import { IJunkyardProps } from "./JunkyardModel";

export class Junkyard extends React.Component<IJunkyardProps, {}> {
  public render(): JSX.Element {
    return (
      <React.Fragment>
        <div className="junkyard-menu">
          <MainMenuButton title="MENU GŁÓWNE" active={true} onClick={() => this.props.gotoMainMenu()} />
          <h2 className="junkyard-title">THIS IS JUNKYARD MENU</h2>
          <h3>Śmietnisko - to tutaj trafiają martwe roboty</h3>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: IGameRootState) => ({
  gameMode: getGameMode(state),
});

const mapDispatchToProps = (dispatch: any) => ({
  gotoMainMenu: () => dispatch(goToMainMenu()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Junkyard);
