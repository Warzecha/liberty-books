import express from 'express';
import BookService from '../services/books-service';

const getBooksRoutes = () => {
    const router = express.Router();
    router.post('/', createBook);
    router.get('/', findBooks);
    router.get('/:id', getBookById);
    return router;
};

const createBook = async (req, res, next) => {
    try {
        let response = await BookService.createBook(req.body);
        res.json(response);
    } catch (e) {
        console.error(e.message);
        next(e);
    }
};

const getBookById = async (req, res, next) => {
    try {
        const {id} = req.params;
        let response = await BookService.getById(id);
        res.json(response);
    } catch (e) {
        console.error(e.message);
        next(e);
    }
};

const findBooks = async (req, res, next) => {
    try {
        let response = await BookService.getAllBooks(req.query);
        res.json(response);
    } catch (e) {
        console.error(e.message);
        next(e);
    }
};

export {getBooksRoutes};
