import React from "react";
import { connect } from "react-redux";

import { IGameRootState } from "../../models";
import { getGameMode, getGameSettings } from "../../redux/selectors";
import { IMusicBoxModel } from "./MusicBoxModel";

export class MusicBox extends React.Component<IMusicBoxModel, {}> {
  private currentMusic: React.RefObject<HTMLAudioElement>;

  constructor(props: any) {
    super(props);
    this.currentMusic = React.createRef();
  }

  public componentDidMount() {
    // if (this.currentMusic && this.currentMusic.current && this.props.gameSettings.musicOn && this.currentMusic.current.paused) {
    //     this.currentMusic.current.play().catch(err => console.error("An error occured: " +err));
    //     this.currentMusic.current.loop = true;
    // }
  }

  public render(): JSX.Element {
    // if (this.props.gameSettings.musicOn && this.currentMusic.current) {
    //     this.currentMusic.current.volume = this.props.gameSettings.musicVolume / 100;
    //     this.currentMusic.current.play().catch(err => console.error("An error occured: " +err));
    //     this.currentMusic.current.loop = true;
    // }
    // else if (this.currentMusic.current) this.currentMusic.current.pause()

    // if (vid)
    // vid.onload = () => {
    //     console.log("LOADED !");
    // }

    return (
      <audio ref={this.currentMusic} autoPlay onError={() => console.log("ERROR loading audio file !!!")}>
        <source src="/song" onError={() => console.log("Request /song error!")}></source>
      </audio>
    );
  }
}

const mapStateToProps = (state: IGameRootState) => ({
  gameMode: getGameMode(state),
  gameSettings: getGameSettings(state),
});

const mapDispatchToProps = (dispatch: any) => ({});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MusicBox);
