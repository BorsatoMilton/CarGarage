
import {Router} from 'express';
import {findAll, findOneById, findOneByEmailOrUsername, validatePassword, checkUsername, checkEmail, add, update, resetPasswordWithoutToken, remove, sanitizeUsuarioInput, resetPassword, login, findOneByEmailDestinatario} from './usuario.controler.js';

export const usuarioRouter = Router();

usuarioRouter.get('/', findAll);
usuarioRouter.get('/:id', findOneById);
usuarioRouter.get('/checkusername/:username', checkUsername);
usuarioRouter.get('/checkemail/:email', checkEmail);
usuarioRouter.get('/bymail/:mail', findOneByEmailDestinatario);
usuarioRouter.get('/:user/:mail', findOneByEmailOrUsername);
usuarioRouter.post('/login', login);
usuarioRouter.post('/', sanitizeUsuarioInput, add);
usuarioRouter.post('/reset', resetPassword);
usuarioRouter.post('/validate/:id', validatePassword);
usuarioRouter.put('/:id', sanitizeUsuarioInput, update);
usuarioRouter.patch('/:id',sanitizeUsuarioInput, resetPasswordWithoutToken);
usuarioRouter.delete('/:id', remove);


