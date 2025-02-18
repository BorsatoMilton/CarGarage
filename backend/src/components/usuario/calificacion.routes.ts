import {Router} from 'express';
import {findAll, findOne, add, update, findOneByRentAndUser, remove, sanitizeCalificacionInput} from './calificacion.controler.js';

export const calificacionRouter = Router();

calificacionRouter.get('/', findAll);
calificacionRouter.get('/:id', findOne);
calificacionRouter.get('/:userId/:rentId', findOneByRentAndUser);
calificacionRouter.post('/', sanitizeCalificacionInput, add);
calificacionRouter.put('/:id', sanitizeCalificacionInput, update);
calificacionRouter.patch('/:id', sanitizeCalificacionInput, update);
calificacionRouter.delete('/:id', remove);
