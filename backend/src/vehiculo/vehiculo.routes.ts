import {Router} from 'express';
import {sanitizeVehiculoInput, findAll, findOne, add, update, remove, logicRemove} from './vehiculo.controler.js';
import upload from './multer.upload.images.js';


export const vehiculoRouter = Router();

vehiculoRouter.get('/', findAll);
vehiculoRouter.get('/:id', findOne);
vehiculoRouter.post('/',upload.array('imagenes',10), sanitizeVehiculoInput, add);
vehiculoRouter.put('/:id', sanitizeVehiculoInput, update);
vehiculoRouter.patch('/:id', sanitizeVehiculoInput, update);
vehiculoRouter.delete('/:id', logicRemove); //Falta ver si vamos a usar el remove tambien