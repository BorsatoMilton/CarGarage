import {Router} from 'express';
import {sanitizeModeloInput, findAll, findOne, add, update, remove} from './categoria.controler.js';

export const categoriaRouter = Router();

categoriaRouter.get('/', findAll);
categoriaRouter.get('/:id', findOne);
categoriaRouter.post('/', sanitizeModeloInput, add);
categoriaRouter.put('/:id', sanitizeModeloInput, update);
categoriaRouter.patch('/:id', sanitizeModeloInput, update);
categoriaRouter.delete('/:id', remove);