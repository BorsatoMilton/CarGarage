import { Router } from 'express';
import { sanitizeModeloInput, findAll, findOne, add, update, remove } from './marca.controler.js';
export const marcaRouter = Router();
marcaRouter.get('/', findAll);
marcaRouter.get('/:id', findOne);
marcaRouter.post('/', sanitizeModeloInput, add);
marcaRouter.put('/:id', sanitizeModeloInput, update);
marcaRouter.patch('/:id', sanitizeModeloInput, update);
marcaRouter.delete('/:id', remove);
//# sourceMappingURL=marca.routes.js.map