import { Router } from 'express';
import { sanitizeUserInput, findAll, findOne, add, update, remove } from './usuario.controler.js';
export const usuarioRouter = Router();
usuarioRouter.get('/', findAll); //chequear si iria id usuario
usuarioRouter.get('/:id', findOne);
usuarioRouter.post('/', sanitizeUserInput, add);
usuarioRouter.put('/:id', sanitizeUserInput, update);
usuarioRouter.patch('/:id', sanitizeUserInput, update);
usuarioRouter.delete('/:id', remove);
//# sourceMappingURL=usuario.routes.js.map