import {createAction, createReducer} from '@reduxjs/toolkit';

export const setCurrentBookId = createAction('audioPlayer/setCurrentBookId');

export const INITIAL_STATE = {
    currentlyPlayedBookId: null,
    // currentlyPlayedBook: null,
    currentBookProgressSeconds: 0,
    currentChapter: 0
};

const reducer = createReducer(INITIAL_STATE, builder => {

    builder.addCase(setCurrentBookId, (state, {payload}) => {
        state.currentlyPlayedBookId = payload;
        state.currentBookProgressSeconds = 0;
    });
});

export default reducer;
