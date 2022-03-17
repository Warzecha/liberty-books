import React from 'react';
import {createUseStyles} from 'react-jss';
import IconButton from '../common/IconButton';
import {
    FiFastForward,
    FiRewind,
    FiPlay,
    FiPause
} from 'react-icons/fi';
import {formatMillisAsTimePeriod} from './utils';
import Button from '../common/Button';

const AudioBookPlayerView = props => {
    const {
        title,
        chapterName,
        isPlaying,
        onPlayPauseClicked,
        onSkipClicked,
        currentTime,
        duration,
        onScrub,
        onPlaybackRateChange,
        playbackRate,
    } = props;

    const classes = useStyles();

    return (
        <div className={classes.container}>

            <div className={classes.currentlyPlayedInfo}>
                <span>
                    {title}
                </span>
                <span className={classes.chapterName}>
                    {chapterName}
                </span>
            </div>

            <div className={classes.row}>
                <div className={classes.audioControls}>
                    <IconButton onClick={() => onSkipClicked(-30)}>
                        <FiRewind/>
                    </IconButton>

                    <IconButton onClick={onPlayPauseClicked}>
                        {isPlaying ? <FiPause/> : <FiPlay/>}
                    </IconButton>

                    <IconButton onClick={() => onSkipClicked(30)}>
                        <FiFastForward/>
                    </IconButton>

                    <Button onClick={() => onPlaybackRateChange()}>
                        {`${playbackRate || 1}x`}
                    </Button>
                </div>

                <span className={classes.timeContainer} style={{textAlign: 'right'}}>
                    {currentTime ? formatMillisAsTimePeriod(currentTime * 1000) : '00:00'}
                </span>

                <input
                    type="range"
                    min={0}
                    max={duration}
                    value={currentTime || 0}
                    onInput={event => onScrub(event.target.value)}
                    className={classes.slider}
                />

                <span className={classes.timeContainer}>
                {duration ? formatMillisAsTimePeriod(duration * 1000) : '00:00'}
            </span>
            </div>
        </div>
    );
};

const useStyles = createUseStyles(theme => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        bottom: 0,
        left: 248,
        right: 0,
        position: 'fixed',
        borderTop: '1px solid lightgray',
    },
    currentlyPlayedInfo: {
        display: 'flex',
        alignItems: 'center',
        padding: 8
    },
    chapterName: {
        marginLeft: 8,
        color: theme.palette.text.secondary
    },
    row: {
        display: 'flex',
        alignItems: 'center',
    },
    audioControls: {
        display: 'flex',
        padding: 10,
    },
    timeContainer: {
        padding: 10,
        minWidth: 60,
        color: theme.palette.text.secondary
    },
    slider: {
        width: '100%'
    }
}));

export default AudioBookPlayerView;
