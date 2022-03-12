import express from 'express';
import {getBooksRoutes} from './books';

const getRoutes = () => {
  const router = express.Router();
  router.use('/books', getBooksRoutes());
  return router;
};
export {getRoutes};
