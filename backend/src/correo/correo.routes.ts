import { Router } from 'express';
import { confirmarCompra, envioCorreo } from './correo.controller.js'; 

export const correoRouter = Router();


correoRouter.post('/', envioCorreo);



