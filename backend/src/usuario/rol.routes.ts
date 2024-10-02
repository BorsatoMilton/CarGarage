import {Router} from 'express';
import {sanitizeRolInput, findAll, findOneByName,findOneById, add, update, remove} from './rol.controler.js';

export const rolRouter = Router();

rolRouter.get('/', findAll);
rolRouter.get('/byname/:name', findOneByName);
rolRouter.get('/:id', findOneById);
rolRouter.post('/', sanitizeRolInput, add);
rolRouter.put('/:id', sanitizeRolInput, update);
rolRouter.patch('/:id', sanitizeRolInput, update);
rolRouter.delete('/:id', remove);