import {findCurrentChapter} from './utils';

test('Return correct chapter and time offsets', () => {
    const {
        chapterIndex,
        timeOffset,
        totalTimeOffset
    } = findCurrentChapter([{durationSeconds: 100}, {durationSeconds: 100}], 120);

    expect(chapterIndex).toBe(1);
    expect(timeOffset).toBe(20);
    expect(totalTimeOffset).toBe(100);
});
