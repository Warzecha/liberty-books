import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {useParams} from 'react-router-dom';
import {useGetBookByIdQuery} from '../../services/books';
import {useSelector} from 'react-redux';
import AudioBookPlayerView from './AudioBookPlayerView';
import {findCurrentChapter} from './utils';

const AudioBookPlayer = () => {
    // const {bookId} = useParams();

    const {
        currentlyPlayedBookId,
        currentBookProgressSeconds,
        // currentChapter
    } = useSelector(state => state.audioPlayer);

    const {
        data,
        error,
        isLoading,
        requestId
    } = useGetBookByIdQuery(currentlyPlayedBookId, {skip: !currentlyPlayedBookId});

    const [currentChapter, setCurrentChapter] = useState(0);
    const [totalTimeOffset, setTotalTimeOffset] = useState(0);
    const [_, setForceUpdateCounter] = useState(0);
    const forceUpdate = () => setForceUpdateCounter(prev => prev + 1);

    useEffect(() => {
        setInterval(forceUpdate, 100);

        return () => {
            if (audioState) {
                audioState.pause();
            }
        };
    }, []);

    useEffect(() => {
        if (data) {
            const {
                chapters = [],
            } = data || {};

            const {audioUrl} = chapters[currentChapter];
            playAudioAtTime(audioUrl, 0);
        }
    }, [requestId]);

    const {
        id,
        title,
        description,
        coverImage,
        authors,
        chapters = [],
        audioDurationSeconds
    } = data || {};

    const [audioState, setAudioState] = useState(null);
    const {duration, currentTime, playbackRate} = audioState || {};

    const chapterName = useMemo(() => {
        if (chapters && id) {
            const {
                name
            } = chapters[currentChapter];
            return name;
        } else {
            return '';
        }
    }, [currentChapter, id]);

    const updateCurrentTime = (newTime) => {
        console.log('updateCurrentTime', chapters, newTime);
        const {chapterIndex, timeOffset, totalTimeOffset} = findCurrentChapter(chapters, newTime);
        console.log('play chapter: ', chapterIndex);
        playAudioAtTime(chapters[chapterIndex].audioUrl, timeOffset);
        setCurrentChapter(chapterIndex);
        setTotalTimeOffset(totalTimeOffset);
    };

    const playNextChapter = () => {
        if (currentChapter < chapters.length) {
            const nextChapterIndex = currentChapter + 1;
            const {audioUrl} = chapters[nextChapterIndex];
            const {durationSeconds: prevChapterDuration} = chapters[currentChapter];
            setTotalTimeOffset(prev => prev + prevChapterDuration);
            setCurrentChapter(nextChapterIndex);

            playAudioAtTime(audioUrl, 0);
        } else {
            alert('Audiobook end!');
        }
    };

    const playAudioAtTime = (audioUrl, timeOffset) => {
        if (audioState) {
            audioState.pause();
            audioState.src = audioUrl;
            audioState.currentTime = timeOffset;
            audioState.play();
        } else {
            const tmpAudio = new Audio(audioUrl);
            tmpAudio.addEventListener('canplaythrough', () => {
                tmpAudio.play();
            });

            tmpAudio.onended = () => {
                playNextChapter();
            };

            const storedPlaybackRate = localStorage.getItem('playbackRate');
            try {
                tmpAudio.playbackRate = parseFloat(storedPlaybackRate);
            } catch (err) {
                tmpAudio.playbackRate = 1.0;
            }
            setAudioState(tmpAudio);
        }
    };


    const handleSkipClicked = (seconds) => {
        if (audioState) {
            let newTime = totalTimeOffset + audioState.currentTime + seconds;
            updateCurrentTime(newTime);
        }
    };

    const handlePlaybackRateChange = (newRate) => {
        if (!newRate) {
            const index = availablePlaybackRates.indexOf(playbackRate);

            if (index === -1) {
                newRate = 1.0;
            } else if (index < availablePlaybackRates.length - 1) {
                newRate = availablePlaybackRates[index + 1];
            } else {
                newRate = 0.5;
            }
        }

        localStorage.setItem('playbackRate', newRate);

        if (audioState) {
            audioState.playbackRate = newRate;
        }
    };

    const handlePlayPauseClicked = useCallback(() => {
        if (audioState) {
            console.log('Play/Pause. Is paused: ', audioState.paused);
            const isPaused = audioState.paused;
            if (isPaused) {
                audioState.play();
            } else {
                audioState.pause();
            }
        }
    }, [audioState]);

    if (currentlyPlayedBookId) {
        return (
            <AudioBookPlayerView
                title={title}
                chapterName={chapterName}
                isPlaying={audioState ? !audioState.paused : false}
                onPlayPauseClicked={handlePlayPauseClicked}
                onSkipClicked={handleSkipClicked}
                duration={audioDurationSeconds}
                currentTime={totalTimeOffset + currentTime}
                onScrub={updateCurrentTime}
                onPlaybackRateChange={handlePlaybackRateChange}
                playbackRate={playbackRate}
            />
        );
    } else {
        return null;
    }

};

const availablePlaybackRates = [
    0.5,
    0.8,
    1.0,
    1.2,
    1.5,
    1.8,
    2.0
];

export default AudioBookPlayer;
