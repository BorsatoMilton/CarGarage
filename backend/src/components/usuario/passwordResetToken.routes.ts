import { Router } from 'express';
import { addToken, validateToken, usedToken } from './passwordResetToken.controller.js';

export const recuperacionRouter = Router();


recuperacionRouter.post('/', addToken);


recuperacionRouter.get('/validate/:token', validateToken);

