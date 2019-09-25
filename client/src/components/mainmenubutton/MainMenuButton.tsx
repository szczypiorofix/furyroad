import React from "react";

import "./MainMenuButton.scss";
import { IMainMenuButtonModel } from "./MainMenuButtonModel";

export class MainMenuButton extends React.Component<IMainMenuButtonModel, {}> {
  public render(): JSX.Element {
    return (
      <button
        style={this.props.active ? { visibility: "visible" } : { visibility: "hidden" }}
        onClick={() => this.props.onClick()}
      >
        {this.props.title}
        {this.props.children}
      </button>
    );
  }
}
