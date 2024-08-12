
import {Router} from 'express';
import {findAll, findOneByEmail, findOneById, add, update, remove, sanitizeUsuarioInput} from './usuario.controler.js';

export const usuarioRouter = Router();

usuarioRouter.get('/', findAll);
usuarioRouter.get('/login/:email', findOneByEmail);
usuarioRouter.get('/:id', findOneById);
usuarioRouter.post('/', sanitizeUsuarioInput, add);
usuarioRouter.put('/:id', sanitizeUsuarioInput, update);
usuarioRouter.patch('/:id', sanitizeUsuarioInput, update);
usuarioRouter.delete('/:id', remove);


