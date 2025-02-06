import { Request, Response } from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { findOneByEmail } from '../usuario/usuario.controler.js';
import { generateToken } from '../../shared/db/tokenGenerator.js';
import { PasswordResetToken } from '../usuario/passwordResetToken.entity.js';
import { orm } from '../../shared/db/orm.js';
import { findOneById } from '../vehiculo/vehiculo.controler.js';
import { getOneById } from '../alquiler/alquiler.controler.js';



dotenv.config();

async function envioCorreo (req: Request, res: Response)  {
    
    const destinatario = req.body.destinatario;
    

    const user = await findOneByEmail(destinatario);
    if (!user) {
        return res.status(404).json({ ok: false, message: 'Usuario no encontrado' });
    }

    const token = generateToken();
    const resetLink = `http://localhost:4200/auth/reset-password?token=${token}`
    const tokenEntity = new PasswordResetToken(token, user);
    await orm.em.persistAndFlush(tokenEntity);

    const config = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_USER, 
            pass: process.env.EMAIL_PASS
        }
    });

    const opciones = {
        from: process.env.EMAIL_USER,
        subject: 'Recuperación de contraseña',
        to: destinatario,
        text: `Para recuperar tu contraseña, haz clic en el siguiente enlace: ${resetLink}`
    };

    config.sendMail(opciones, (error: Error | null, info: any) => {
        if (error) {
            return res.status(500).json({
                ok: false,
                message: 'Error al enviar el correo',
                error: error.message
            });
        }

        return res.status(200).json({
            ok: true,
            message: 'Correo enviado correctamente',
            info: info.response
        });
    });
};

async function avisoCompraExitosa (req: Request, res: Response) {
    const destinatario = req.body.destinatario;
    console.log(destinatario);
    const user = await findOneByEmail(destinatario);
    if (!user) {
        return res.status(404).json({ ok: false, message: 'Usuario no encontrado' });
    }
    
    const config = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_USER, 
            pass: process.env.EMAIL_PASS
        }
    });

    const opciones = {
        from: process.env.EMAIL_USER,
        subject: 'Compra exitosa',
        to: destinatario,
        text: 'Su compra se ha realizado con éxito. En breve se comunicarán con usted para coordinar la entrega.'
    };

    config.sendMail(opciones, (error: Error | null, info: any) => {
        if (error) {
            return res.status(500).json({
                ok: false,
                message: 'Error al enviar el correo',
                error: error.message
            });
        }

        return res.status(200).json({
            ok: true,
            message: 'Correo enviado correctamente',
            info: info.response
        });
    });
}

async function confirmarCompra (req: Request, res: Response) {
    const destinatario = req.body.destinatario;
    const id = req.body.id;
    const confirmLink = `http://localhost:4200/product/confirm-purchase?id=${id}&destinatario=${destinatario}`;
    const user = await findOneByEmail(destinatario);
    if (!user) {
        return res.status(404).json({ ok: false, message: 'Usuario no encontrado' });
    }
    const vehiculo = await findOneById(id);
    if (!vehiculo) {
        return res.status(404).json({ ok: false, message: 'Vehículo no encontrado' });
    }
    
    const config = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_USER, 
            pass: process.env.EMAIL_PASS
        }
    });

    const opciones = {
        from: process.env.EMAIL_USER,
        subject: 'Confirmación de compra',
        to: destinatario,
        text: `Para confirmar la compra, haz clic en el siguiente enlace: ${confirmLink}`
    };

    config.sendMail(opciones, (error: Error | null, info: any) => {
        if (error) {
            return res.status(500).json({
                ok: false,
                message: 'Error al enviar el correo',
                error: error.message
            });
        }

        return res.status(200).json({
            ok: true,
            message: 'Correo enviado correctamente',
            info: info.response
        });
    });
}

async function confirmRent (req: Request, res: Response) {
    const destinatario = req.body.destinatario;
    const idAlquiler = String(req.body.id);
    const confirmLinkRent = `http://localhost:4200/product/confirm-rent?id=${idAlquiler}`;
    const alquiler = await getOneById(idAlquiler);
    if(!alquiler) {
        return res.status(404).json({ ok: false, message: 'Alquiler no encontrado' });
    }

    const config = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_USER, 
            pass: process.env.EMAIL_PASS
        }
    });

    const opciones = {
        from: process.env.EMAIL_USER,
        subject: 'Confirmación de Alquiler',
        to: destinatario,
        text: `Para confirmar el alquiler, haz clic en el siguiente enlace: ${confirmLinkRent}`
    };

    config.sendMail(opciones, (error: Error | null, info: any) => {
        if (error) {
            return res.status(500).json({
                ok: false,
                message: 'Error al enviar el correo',
                error: error.message
            });
        }

        return res.status(200).json({
            ok: true,
            message: 'Correo enviado correctamente',
            info: info.response
        });
    });
}


export { envioCorreo, confirmarCompra, avisoCompraExitosa , confirmRent
};

