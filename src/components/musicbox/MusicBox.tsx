import React from 'react';
import { connect } from 'react-redux';

import { GameRootState } from '../../models';
import { MusicBoxModel} from './MusicBoxModel';
import { getGameMode, getGameSettings } from '../../redux/selectors';


export class MusicBox extends React.Component<MusicBoxModel, {}> {

    private currentMusic: React.RefObject<HTMLAudioElement>;

    constructor(props:any) {
        super(props);
        this.currentMusic = React.createRef();
    }

    componentDidMount() {      
        if (this.currentMusic && this.currentMusic.current && this.props.gameSettings.musicOn && this.currentMusic.current.paused) {
            this.currentMusic.current.play()
            .then( () => this.currentMusic.current ? this.currentMusic.current.loop = true : console.error("Cannot set music loop!") )
            .catch(err => console.error("An error occured: " +err));
        }
    }

    render():JSX.Element {
        if (this.props.gameSettings.musicOn && this.currentMusic.current) {
            this.currentMusic.current.volume = this.props.gameSettings.musicVolume / 100;
            this.currentMusic.current.play();
        }
        else if (this.currentMusic.current) this.currentMusic.current.pause()

        return <audio ref={this.currentMusic} src="/song" autoPlay />
    }
}

const mapStateToProps = (state: GameRootState) => ({
    gameMode:  getGameMode(state),
    gameSettings: getGameSettings(state)
 });
 
const mapDispatchToProps = (dispatch:any) => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(MusicBox);
