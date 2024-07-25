import {Router} from 'express';
import {findAll, findOne, add, update, remove, sanitizeCalificacionInput} from './calificacion.controler.js';

export const calificacionRouter = Router();

calificacionRouter.get('/', findAll);
calificacionRouter.get('/:id', findOne);
calificacionRouter.post('/', sanitizeCalificacionInput, add);
calificacionRouter.put('/:id', sanitizeCalificacionInput, update);
calificacionRouter.patch('/:id', sanitizeCalificacionInput, update);
calificacionRouter.delete('/:id', remove);
