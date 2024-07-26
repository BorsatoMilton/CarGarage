import {Router} from 'express';
import {sanitizeProductoInput, findAll, findOne, add, update, remove} from './subasta.controler.js';

export const subastaRouter = Router();

subastaRouter.get('/', findAll);
subastaRouter.get('/:id', findOne);
subastaRouter.post('/', sanitizeProductoInput, add);
subastaRouter.put('/:id', sanitizeProductoInput, update);
subastaRouter.patch('/:id', sanitizeProductoInput, update);
subastaRouter.delete('/:id', remove);