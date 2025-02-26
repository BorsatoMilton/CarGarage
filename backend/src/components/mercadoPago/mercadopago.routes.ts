import { Router } from 'express';
import { createPreference } from './mercadopago.controller.js';
import { mercadoPagoWebhook } from '../webhooks/webhook.controller.js';

export const mercadoPagoRouter = Router();

mercadoPagoRouter.post('/create-preference', createPreference)
mercadoPagoRouter.post('/webhook', mercadoPagoWebhook)
