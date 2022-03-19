import mongoose from 'mongoose';
import {jsonFormatterPlugin, throwErrorIfDoesNotExist} from '../utils/mongoose-utils';

const ChapterSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    audioUrl: {
        type: String,
    },
    durationSeconds: Number,
    offsetSeconds: Number
});

const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    type: {
        type: String,
        enum: ['ebook', 'audiobook'],
        required: true
    },
    coverImage: {
        type: String
    },
    authors: [String],
    chapters: [ChapterSchema],
    durationMinutes: Number,
    audioDurationSeconds: Number
}, {timestamps: true});

mongoose.model('BookSchema', BookSchema);


BookSchema.post('findOne', throwErrorIfDoesNotExist);
BookSchema.post('findById', throwErrorIfDoesNotExist);
BookSchema.post('findOneAndDelete', throwErrorIfDoesNotExist);

BookSchema.plugin(jsonFormatterPlugin);
