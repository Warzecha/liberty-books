import mongoose from 'mongoose';
import {jsonFormatterPlugin, throwErrorIfDoesNotExist} from '../utils/mongoose-utils';

const {Schema} = mongoose;

const ChapterSchema = new Schema({
    name: {
        type: String,
    },
    audioUrl: {
        type: String,
    },

});

const BookSchema = new Schema({
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
    durationMinutes: Number
}, {timestamps: true});

mongoose.model('BookSchema', BookSchema);


BookSchema.post('findOne', throwErrorIfDoesNotExist);
BookSchema.post('findById', throwErrorIfDoesNotExist);
BookSchema.post('findOneAndDelete', throwErrorIfDoesNotExist);

BookSchema.plugin(jsonFormatterPlugin);
