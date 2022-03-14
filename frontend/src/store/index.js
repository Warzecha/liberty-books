import {configureStore} from '@reduxjs/toolkit';
import booksReducer from './booksReducer';

const reducer = {
    books: booksReducer,
};

const store = configureStore({
    reducer: reducer,
    devTools: true
});

export default store;
