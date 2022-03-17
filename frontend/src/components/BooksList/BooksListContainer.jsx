import React from 'react';
import {createUseStyles} from 'react-jss';
import {useGetAllBooksQuery} from '../../services/books';
import BookCard from './BookCard';

const BooksListContainer = () => {
    const {data, error, isLoading} = useGetAllBooksQuery();

    const classes = useStyles();

    return (
        <div>
            <h1>Books</h1>

            <div>

                <span>{isLoading && 'Loading...'}</span>

                <div>
                    {error && JSON.stringify(error)}
                </div>

                <div className={classes.booksContainer}>
                    {data && data.map((book) => <BookCard book={book} key={book.id}/>)}
                </div>

            </div>
        </div>
    );
};

const useStyles = createUseStyles({
    booksContainer: {
        display: 'grid',
        gap: 10,
        gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))'

    }
});

export default BooksListContainer;
