import { Router } from "express";
import { sanitizeUserInput, findAll, findOne, add, update, remove } from "./subasta.controler.js";
export const subastaRouter = Router();
subastaRouter.get('/', findAll);
subastaRouter.get('/:id', findOne);
subastaRouter.post('/', sanitizeUserInput, add);
subastaRouter.put('/:id', sanitizeUserInput, update);
subastaRouter.patch('/:id', sanitizeUserInput, update);
subastaRouter.delete('/:id', remove);
//# sourceMappingURL=subasta.routes.js.map