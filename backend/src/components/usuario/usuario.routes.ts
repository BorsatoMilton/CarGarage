
import {Router} from 'express';
import {findAll, findOneById, findOneByEmailOrUsername, add, update, resetPasswordWithoutToken, remove, sanitizeUsuarioInput, resetPassword, login, findOneByEmailDestinatario} from './usuario.controler.js';

export const usuarioRouter = Router();

usuarioRouter.get('/', findAll);
usuarioRouter.get('/:id', findOneById);
usuarioRouter.get('/:user/:mail', findOneByEmailOrUsername);
usuarioRouter.get('/bymail/:mail', findOneByEmailDestinatario);
usuarioRouter.post('/login', login);
usuarioRouter.post('/', sanitizeUsuarioInput, add);
usuarioRouter.post('/reset', resetPassword);
usuarioRouter.put('/:id', sanitizeUsuarioInput, update);
usuarioRouter.patch('/:id',sanitizeUsuarioInput, resetPasswordWithoutToken);
usuarioRouter.delete('/:id', remove);


