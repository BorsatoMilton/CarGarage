import { Router } from "express";
import { findAll, findOne, add, update, remove, sanitizePedidoInput } from "./pedido.controler.js";

export const pedidoRouter = Router();  

pedidoRouter.get('/', findAll);
pedidoRouter.get('/:id', findOne);
pedidoRouter.post('/', sanitizePedidoInput, add);
pedidoRouter.put('/:id', sanitizePedidoInput, update);
pedidoRouter.patch('/:id', sanitizePedidoInput, update);
pedidoRouter.delete('/:id', remove);

