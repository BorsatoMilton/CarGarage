import { Router } from 'express';
import { recuperarContraseña } from './correo.controller.js'; 

export const correoRouter = Router();


correoRouter.post('/', recuperarContraseña);



