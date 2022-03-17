import moment from 'moment';

export const formatMillisAsTimePeriod = (durationMillis) => {
    const duration = durationMillis ? moment.duration(durationMillis) : null;

    if (duration.hours()) {
        return `${duration.hours().toString().padStart(2, '0')}:${duration.minutes().toString().padStart(2, '0')}:${duration.seconds().toString().padStart(2, '0')}`;
    } else {
        return `${duration.minutes().toString().padStart(2, '0')}:${duration.seconds().toString().padStart(2, '0')}`;
    }
};

export const findCurrentChapter = (chapters, timeSeconds) => {
    let totalTimeOffset = 0;
    for (let i = 0; i < chapters.length; i++) {
        const {
            durationSeconds: chapterDuration
        } = chapters[i];

        if (chapterDuration > timeSeconds) {
            return {
                chapterIndex: i,
                timeOffset: timeSeconds,
                totalTimeOffset: totalTimeOffset
            };
        } else {
            timeSeconds -= chapterDuration;
            totalTimeOffset += chapterDuration;
        }
    }

    return null;
};
