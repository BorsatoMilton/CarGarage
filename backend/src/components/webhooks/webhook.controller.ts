import { Request, Response } from 'express';
import { mercadoPagoClient } from '../../config/mercadopago.js';
import { Payment } from 'mercadopago';
import { orm } from '../../shared/db/orm.js';
import { Alquiler } from '../alquiler/alquiler.entity.js';

const em = orm.em

async function mercadoPagoWebhook(req: Request, res: Response) {

    try {
        console.log('Id:', req.body.data.id);
        console.log('Notificación de Mercado Pago:', req.body);

        if (req.body.type === 'payment') {
            const paymentId = req.body.data.id;
            console.log(`Buscando pago con ID: ${paymentId}`);


            const paymentClient = new Payment(mercadoPagoClient);
            console.log('Buscando pago con ID:', mercadoPagoClient);
            const payment = await paymentClient.get({ id: paymentId });
            console.log('Pago recibido:', payment);

            if (!payment) {
              console.error(`❌ No se encontró el pago con ID: ${paymentId}`);
              return res.status(404).json({ error: 'Pago no encontrado' });
          }



            if (payment.status === 'approved') {
                console.log('💰 Pago aprobado. Actualizar base de datos.');
                const alquiler = await em.findOne(Alquiler, { id: payment.external_reference });
                if (alquiler) {
                    alquiler.fechaPago = new Date();
                    await em.persistAndFlush(alquiler);
                }
                
            }
        }

        res.sendStatus(200);

    } catch (error) {
        console.error('❌ Error en webhook:', error);
        res.sendStatus(500);
    }
        
}

export { mercadoPagoWebhook };
