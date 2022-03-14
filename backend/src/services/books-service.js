import logger from '../utils/logger';
import mongoose from 'mongoose';
import {HttpError} from '../utils/error-utils';

require('../models/BookSchema');
const BookSchema = mongoose.model('BookSchema');


const createBook = async (createBookRequest) => {
    logger.info('Creating book: ', createBookRequest);
    try {
        const createdBook = await BookSchema.create(createBookRequest);
        logger.info(`Created book with ID: ${createdBook.id}.`);
        return createdBook;
    } catch (err) {
        if (err.name === 'ValidationError') {
            throw new HttpError(400, err.message);
        } else {
            throw new HttpError(500, err.message);
        }
    }
};

const getAllBooks = async (query) => {
    return await BookSchema.find(query).exec();
};

module.exports = {
    createBook,
    getAllBooks
};
