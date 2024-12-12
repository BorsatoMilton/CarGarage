import { Router } from "express";
import { findAll, findOne, add, update, remove, sanitizeCompraInput } from "./compra.controler.js";
import { confirmarCompra } from "../correo/correo.controller.js";

export const compraRouter = Router();  

compraRouter.get('/', findAll);
compraRouter.get('/:id', findOne);
compraRouter.post('/', sanitizeCompraInput, add);
compraRouter.post('/confirmarCompra',confirmarCompra);
compraRouter.put('/:id', sanitizeCompraInput, update);
compraRouter.patch('/:id', sanitizeCompraInput, update);
compraRouter.delete('/:id', remove);


