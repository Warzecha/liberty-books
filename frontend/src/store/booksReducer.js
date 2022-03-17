import {createAction, createReducer} from '@reduxjs/toolkit';

export const fetchBooksAction = createAction('books/fetchBooks');

export const INITIAL_STATE = {
    books: [],
    filters: {}
};

const reducer = createReducer(INITIAL_STATE, builder => {

    builder.addCase(fetchBooksAction, (state) => {
        console.log('Fetch books action!');
    });
});

export default reducer;
