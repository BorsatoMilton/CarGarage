import {Router} from 'express';
import {sanitizeModeloInput, findAll, findOne, add, update, remove, findOneByName} from './marca.controler.js';

export const marcaRouter = Router();

marcaRouter.get('/', findAll);
marcaRouter.get('/:id', findOne);
marcaRouter.get('/byname/:name', findOneByName);
marcaRouter.post('/', sanitizeModeloInput, add);
marcaRouter.put('/:id', sanitizeModeloInput, update);
marcaRouter.patch('/:id', sanitizeModeloInput, update);
marcaRouter.delete('/:id', remove);