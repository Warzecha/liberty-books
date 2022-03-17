import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const {
    REACT_APP_API_URL
} = process.env;

console.log('REACT_APP_API_URL', REACT_APP_API_URL)

export const booksApi = createApi({
    reducerPath: 'booksApi',
    baseQuery: fetchBaseQuery({baseUrl: REACT_APP_API_URL}),
    endpoints: (builder) => ({
        getAllBooks: builder.query({
            query: () => `books`,
        }),
        getBookById: builder.query({
            query: (id) => {
                console.log('query ID', id)
                return `books/${id}`;
            },
        }),
    }),
});

export const {useGetAllBooksQuery, useGetBookByIdQuery} = booksApi;
