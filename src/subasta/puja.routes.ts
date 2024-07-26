import {Router} from 'express';
import {sanitizeProductoInput, findAll, findOne, add, /*update*/ remove} from './puja.controler.js';

export const pujaRouter = Router();

pujaRouter.get('/', findAll);
pujaRouter.get('/:fecha_puja', findOne);
pujaRouter.post('/', sanitizeProductoInput, add);
/*pujaRouter.put('/:fecha_puja', sanitizeProductoInput, update);
pujaRouter.patch('/:fecha_puja', sanitizeProductoInput, update);*/
pujaRouter.delete('/:fecha_puja', remove);