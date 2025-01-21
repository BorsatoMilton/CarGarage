
import {Router} from 'express';
import {findAll, findOne, add, update, remove, sanitizeTarjetaInput} from './tarjeta.controler.js';

export const tarjetaRouter = Router();

tarjetaRouter.get('/', findAll);
tarjetaRouter.get('/:id', findOne);
tarjetaRouter.post('/', sanitizeTarjetaInput, add);
tarjetaRouter.put('/:id', sanitizeTarjetaInput, update);
tarjetaRouter.patch('/:id', sanitizeTarjetaInput, update);
tarjetaRouter.delete('/:id', remove);
