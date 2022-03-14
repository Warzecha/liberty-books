import React from 'react';
import BooksListContainer from '../components/BooksList/BooksListContainer';
import {Router} from '@reach/router';

const MainNavigation = () => {
    return (
        <Router>
            <BooksListContainer path="/books"/>
        </Router>
    );
};

export default MainNavigation;
