import { Request, Response } from 'express';
import {  Preference } from 'mercadopago';
import { mercadoPagoClient } from '../../config/mercadopago.js';
import { orm } from '../../shared/db/orm.js';
import { Alquiler } from '../alquiler/alquiler.entity.js';

const em = orm.em;


async function createPreference(req: Request, res: Response) {
    console.log('Creando preferencia de pago', req.body);
    try {
        const body = {
            items: req.body.items.map((item: any) => ({
                title: item.title,
                unit_price: Number(item.unit_price),
                quantity: Number(item.quantity),
                currency_id: 'ARS',
            })),
            external_reference: req.body.external_reference,
            back_urls: {
                success: 'http://localhost:4200/success', 
                failure: 'http://localhost:4200/failure',
                pending: 'http://localhost:4200/pending'
            },
            auto_return: 'approved',
        };

        const preferenceClient = new Preference(mercadoPagoClient);
        const preference = await preferenceClient.create({ body });

        const alquiler = await em.findOne(Alquiler, { id: req.body.external_reference });

        if (alquiler) {
            alquiler.paymentId = preference.id;
            await em.persistAndFlush(alquiler);
        }
        
        res.json({ id: preference.id }); // Solo enviar el ID de la preferencia

    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'Internal server error' });
    }
}
export { createPreference };
