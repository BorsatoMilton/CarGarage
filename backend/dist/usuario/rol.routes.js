import { Router } from 'express';
import { sanitizeRolInput, findAll, findOne, add, update, remove } from './rol.controler.js';
export const rolRouter = Router();
rolRouter.get('/', findAll);
rolRouter.get('/:id', findOne);
rolRouter.post('/', sanitizeRolInput, add);
rolRouter.put('/:id', sanitizeRolInput, update);
rolRouter.patch('/:id', sanitizeRolInput, update);
rolRouter.delete('/:id', remove);
//# sourceMappingURL=rol.routes.js.map