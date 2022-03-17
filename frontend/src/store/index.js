import {configureStore} from '@reduxjs/toolkit';
import booksReducer from './booksReducer';
import audioPlayerReducer from './audioPlayerReducer';
import {booksApi} from '../services/books';



const store = configureStore({
    reducer: {
        audioPlayer: audioPlayerReducer,
        [booksApi.reducerPath]: booksApi.reducer
    },
    devTools: true,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(booksApi.middleware),
});

export default store;
