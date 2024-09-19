import { Router } from "express";
import { findAll, findOne, add, update, remove, sanitizeCompraInput } from "./compra.controler.js";
export const compraRouter = Router();
compraRouter.get('/', findAll);
compraRouter.get('/:id', findOne);
compraRouter.post('/', sanitizeCompraInput, add);
compraRouter.put('/:id', sanitizeCompraInput, update);
compraRouter.patch('/:id', sanitizeCompraInput, update);
compraRouter.delete('/:id', remove);
//# sourceMappingURL=compra.routes.js.map