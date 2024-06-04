import {Router} from 'express';
import {sanitizeUserInput, findAll, findOne, add, update, remove} from './producto.controler.js';

export const productoRouter = Router();

productoRouter.get('/', findAll);//chequear si iria id producto
productoRouter.get('/:id', findOne);
productoRouter.post('/', sanitizeUserInput, add);
productoRouter.put('/:id', sanitizeUserInput, update);
productoRouter.patch('/:id', sanitizeUserInput, update);
productoRouter.delete('/:id', remove);