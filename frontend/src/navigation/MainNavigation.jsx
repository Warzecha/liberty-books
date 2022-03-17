import React from 'react';
import {
    Routes,
    Route,
} from 'react-router-dom';
import BooksListContainer from '../components/BooksList/BooksListContainer';
import BookDetails from '../components/BookDetails/BookDetails';

const MainNavigation = () => {
    return (

        <Routes>
            <Route path="/books/:bookId" element={<BookDetails/>}/>
            <Route path="/books" element={<BooksListContainer/>}/>

        </Routes>
    );
};

export default MainNavigation;
