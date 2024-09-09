import express from 'express';
import { uploadImage, getImage } from './imagen.controller.js';

const Router = express.Router();
Router.post('/upload', uploadImage);
Router.get('/get/:filename', getImage);

export default Router;
