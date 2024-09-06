import {Router} from 'express'; 
import {findAll, findOne, add, update, remove, sanitizeLineaCompraInput} from '../compra/lineacompra.controler.js';

export const lineacompraRouter = Router();

lineacompraRouter.get('/', findAll);
lineacompraRouter.get('/:id', findOne);
lineacompraRouter.post('/', sanitizeLineaCompraInput, add);
lineacompraRouter.put('/:id', sanitizeLineaCompraInput, update);
lineacompraRouter.patch('/:id', sanitizeLineaCompraInput, update);
lineacompraRouter.delete('/:id', remove);
