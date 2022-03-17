import logger from '../utils/logger';
import mongoose from 'mongoose';
import {HttpError} from '../utils/error-utils';

const {getAudioDurationInSeconds} = require('get-audio-duration');

require('../models/BookSchema');
const BookSchema = mongoose.model('BookSchema');


const createBook = async (createBookRequest) => {
    logger.info('Creating book: ', createBookRequest);
    try {

        const {
            chapters = []
        } = createBookRequest;

        const chaptersWithDuration = await Promise.all(chapters.map(async (chapter) => {
            const durationSeconds = await getAudioDurationInSeconds(chapter.audioUrl);

            return {
                ...chapter,
                durationSeconds
            };
        }));

        const totalAudioDuration = chaptersWithDuration.reduce(((prev, {durationSeconds}) => prev + durationSeconds), 0);

        const bookToCreate = {
            ...createBookRequest,
            chapters: chaptersWithDuration,
            audioDurationSeconds: totalAudioDuration
        };

        const createdBook = await BookSchema.create(bookToCreate);
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
    logger.info(`Fetch all books: ${JSON.stringify(query)}`);
    return await BookSchema.find(query).exec();
};

const getById = async (id) => {
    logger.info(`Get book by ID: ${id}`);
    return await BookSchema.findById(id).exec();
};

module.exports = {
    createBook,
    getAllBooks,
    getById
};
