
import {Router} from 'express';
import {findAll, findOneByUser, findOneById, add, update, remove, sanitizeUsuarioInput, resetPassword, login} from './usuario.controler.js';

export const usuarioRouter = Router();

usuarioRouter.get('/', findAll);
usuarioRouter.get('/:id', findOneById);
usuarioRouter.post('/login', login);
usuarioRouter.post('/', sanitizeUsuarioInput, add);
usuarioRouter.post('/reset', resetPassword);
usuarioRouter.put('/:id', sanitizeUsuarioInput, update);
usuarioRouter.patch('/:id', sanitizeUsuarioInput, update);
usuarioRouter.delete('/:id', remove);


