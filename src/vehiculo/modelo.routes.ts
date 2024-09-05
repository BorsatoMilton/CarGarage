import {Router} from 'express';
import {sanitizeModeloInput, findAll, findOne, add, update, remove} from './modelo.controler.js';

export const modeloRouter = Router();

modeloRouter.get('/', findAll);
modeloRouter.get('/:id', findOne);
modeloRouter.post('/', sanitizeModeloInput, add);
modeloRouter.put('/:id', sanitizeModeloInput, update);
modeloRouter.patch('/:id', sanitizeModeloInput, update);
modeloRouter.delete('/:id', remove);