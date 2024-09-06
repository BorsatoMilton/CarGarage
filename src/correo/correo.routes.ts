import { Router } from 'express';
import { envioCorreo } from './correo.controller.js'; 

export const correoRouter = Router();


correoRouter.post('/', envioCorreo);


