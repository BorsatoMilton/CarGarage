import {Router} from 'express';
import {sanitizeAlquilerInput, findAll, findAllByVehicle, findAllByUser, findOne, add, update, remove, cancelRent} from './alquiler.controler.js';
import {confirmRent} from '../correo/correo.controller.js';
export const alquilerRouter = Router();

alquilerRouter.get('/', findAll);
alquilerRouter.get('/:id', findOne);
alquilerRouter.get('/vehiculo/:id', findAllByVehicle);
alquilerRouter.get('/usuario/:id', findAllByUser);
alquilerRouter.post('/', sanitizeAlquilerInput, add);
alquilerRouter.post('/confirmarAlquiler', confirmRent);
alquilerRouter.put('/:id', sanitizeAlquilerInput, update);
alquilerRouter.put('/cancelar/:id', cancelRent);
alquilerRouter.patch('/:id', sanitizeAlquilerInput, update);
alquilerRouter.delete('/:id', remove);