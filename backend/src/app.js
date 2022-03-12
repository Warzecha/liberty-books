import express from 'express';
import 'express-async-errors';
import logger from './utils/logger';
import {getRoutes} from './routes';
import mongoose from 'mongoose';
import cors from 'cors';

const {
    MONGODB_URL,
    PORT
} = process.env;

const connectToMongoDb = async (mongoDbUrl) => {
    await mongoose.connect(mongoDbUrl, {useNewUrlParser: true, useUnifiedTopology: true});
    logger.info(`Connected to MongoDB.`);
};

const startServer = ({port}) => {
    const app = express();
    app.use(express.json());
    app.use(cors());
    app.use('/api', getRoutes());
    // app.use('/files', express.static('files'));

    app.use((req, res, next) => {
        res.status(404).json({
            message: `Could not find path: ${req.path}`
        });
    });

    app.use((err, req, res, next) => {
        if (res.headersSent) {
            next(err);
        } else {
            logger.error(err);

            const {
                statusCode = 500,
                message = 'Unknown error'
            } = err || {};

            res.status(statusCode)
                .json({
                    status: "error",
                    statusCode,
                    message,
                    ...(process.env.NODE_ENV === 'production' ? null : {stack: err.stack})
                });

        }
    });

    return new Promise(resolve => {
        const server = app.listen(port, () => {
            logger.info(`Listening on port: ${port}`);
        });
    });
};

connectToMongoDb(MONGODB_URL)
    .then(() => startServer({port: PORT}))
    .catch(err => {
        logger.error(`Failed to start server. Error: ${err.message}`);
    });
