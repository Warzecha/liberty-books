import React from 'react';
import {createUseStyles} from 'react-jss';
import IconButton from '../common/IconButton';
import {
    FiFastForward,
    FiRewind,
    FiPlay,
    FiPause,
    FiList
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
        chapters,
    } = props;

    const classes = useStyles();

    return (
        <div className={classes.container}>

            <div className={classes.upperRow}>
                <div className={classes.currentlyPlayedInfo}>
                <span>
                    {title}
                </span>
                    <span className={classes.chapterName}>
                    {chapterName}
                </span>
                </div>

                <div className={classes.chapterListButton}>
                    <IconButton>
                        <div className={classes.chapterListContainer}>
                            {
                                chapters.map(({name, offsetSeconds}, i) => (
                                    <div key={`chapter-${i}`} className={classes.chapterListItem}>
                                        <span>{name}</span>

                                        <IconButton onClick={() => onScrub(offsetSeconds)}>
                                            <FiPlay/>
                                        </IconButton>
                                    </div>
                                ))
                            }
                        </div>
                        <FiList/>
                    </IconButton>
                </div>
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
                    list="steplist"
                    className={classes.slider}
                />

                <datalist id="steplist">
                    {(chapters && chapters.length > 0) && chapters.map(({offsetSeconds}, i) => (
                        <option key={`step-${i}`}>{parseInt(offsetSeconds)}</option>
                    ))}
                </datalist>

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
    upperRow: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
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
    },
    chapterListButton: {
        '&:hover $chapterListContainer': {
            visibility: 'visible'
        },
    },
    chapterListContainer: {
        visibility: 'hidden',
        position: 'absolute',
        bottom: 100,
        right: 0,
        padding: 4,
        borderRadius: 4,
        border: '1px solid #ddd',
        display: 'flex',
        flexDirection: 'column',
        pointer: 'default'
    },
    chapterListItem: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    }
}));

export default AudioBookPlayerView;
