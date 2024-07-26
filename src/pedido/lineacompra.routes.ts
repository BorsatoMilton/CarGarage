import {Router} from 'express'; 
import {findAll, findOne, add, update, remove, sanitizelineacompraInput} from '../pedido/lineacompra.controler.js';

export const lineacompraRouter = Router();

lineacompraRouter.get('/', findAll);
lineacompraRouter.get('/:id', findOne);
lineacompraRouter.post('/', sanitizelineacompraInput, add);
lineacompraRouter.put('/:id', sanitizelineacompraInput, update);
lineacompraRouter.patch('/:id', sanitizelineacompraInput, update);
lineacompraRouter.delete('/:id', remove);
