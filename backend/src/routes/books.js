import express from 'express';

const getBooksRoutes = () => {
    const router = express.Router();
    // router.get('/info', getInfo);

    // router.post('/:meetingId/transcribe', verifyTokenMiddleware, transcribeMeeting);
    // router.post('/:meetingId/summarize', verifyTokenMiddleware, summarizeMeeting);
    // router.get('/:meetingId', verifyTokenMiddleware, getMeetingDetails);
    // router.post('/upload/audio', verifyTokenMiddleware, uploadAudioMeeting);
    // router.get('/', verifyTokenMiddleware, getMeetingsForUser);
    // router.post('/', createMeeting);
    return router;
};

export {getBooksRoutes};
