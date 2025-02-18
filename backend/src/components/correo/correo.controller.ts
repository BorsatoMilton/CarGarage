import { Request, Response } from 'express';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { findOneByEmail } from '../usuario/usuario.controler.js';
import { generateToken } from '../../shared/db/tokenGenerator.js';
import { PasswordResetToken } from '../usuario/passwordResetToken.entity.js';
import { orm } from '../../shared/db/orm.js';
import { findOneById } from '../vehiculo/vehiculo.controler.js';
import { getOneById } from '../alquiler/alquiler.controler.js';
import { Alquiler } from '../alquiler/alquiler.entity.js';



dotenv.config();

async function recuperarContraseña(req: Request, res: Response) {
    const destinatario = req.body.destinatario;

    const user = await findOneByEmail(destinatario);
    if (!user) {
        return res.status(404).json({ ok: false, message: 'Usuario no encontrado' });
    }

    const token = generateToken();
    const resetLink = `http://localhost:4200/auth/reset-password?token=${token}`;
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

    const htmlContent = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Recuperación de contraseña</title>
        <style>
            body { font-family: Arial, sans-serif; background-color: #f8f9fa; color: #333; margin: 0; padding: 20px; }
            .container { max-width: 600px; margin: 0 auto; background: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); }
            h2 { color: #d9534f; text-align: center; }
            p { font-size: 16px; line-height: 1.5; }
            .button { display: block; width: 100%; text-align: center; margin-top: 20px; }
            .button a { background-color: #007bff; color: white; text-decoration: none; padding: 12px 20px; border-radius: 5px; display: inline-block; }
        </style>
    </head>
    <body>
        <div class="container">
            <h2>Recuperación de contraseña</h2>
            <p>Hola <strong>${user.nombre}</strong>,</p>
            <p>Hemos recibido una solicitud para restablecer tu contraseña. Para continuar con el proceso, haz clic en el siguiente botón:</p>
            <div class="button">
                <a href="${resetLink}">Restablecer contraseña</a>
            </div>
            <p>Si no solicitaste este cambio, puedes ignorar este mensaje.</p>
        </div>
    </body>
    </html>
    `;

    const opciones = {
        from: process.env.EMAIL_USER,
        subject: 'Recuperación de contraseña',
        to: destinatario,
        html: htmlContent 
    };

    try {
        const info = await config.sendMail(opciones);
        return res.status(200).json({
            ok: true,
            message: 'Correo enviado correctamente',
            info: info.response
        });
    } catch (error: any) {
        return res.status(500).json({
            ok: false,
            message: 'Error al enviar el correo',
            error: error.message
        });
    }
};

async function avisoCompraExitosa(req: Request, res: Response) {
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

    const htmlContent = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Compra Exitosa</title>
        <style>
            body { font-family: Arial, sans-serif; background-color: #f8f9fa; color: #333; margin: 0; padding: 20px; }
            .container { max-width: 600px; margin: 0 auto; background: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); }
            h2 { color: #007bff; text-align: center; }
            p { font-size: 16px; line-height: 1.5; }
        </style>
    </head>
    <body>
        <div class="container">
            <h2>¡Compra Exitosa!</h2>
            <p>Hola <strong>${user.nombre}</strong>,</p>
            <p>Queremos informarte que tu compra se ha realizado con éxito. En breve, el propietario se pondra en contacto contigo para coordinar la entrega.</p>
            <p>Si tienes alguna consulta, no dudes en comunicarte con nuestro equipo de soporte.</p>
        </div>
    </body>
    </html>
    `;

    const opciones = {
        from: process.env.EMAIL_USER,
        subject: 'Compra Exitosa',
        to: destinatario,
        html: htmlContent 
    };

    try {
        const info = await config.sendMail(opciones);
        return res.status(200).json({
            ok: true,
            message: 'Correo enviado correctamente',
            info: info.response
        });
    } catch (error: any) {
        return res.status(500).json({
            ok: false,
            message: 'Error al enviar el correo',
            error: error.message
        });
    }
}


async function confirmarCompra(req: Request, res: Response) {
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

    const htmlContent = `
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Confirmación de compra</title>
        <style>
            body { font-family: Arial, sans-serif; background-color: #f8f9fa; color: #333; margin: 0; padding: 20px; }
            .container { max-width: 600px; margin: 0 auto; background: #fff; padding: 20px; border-radius: 8px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); }
            h2 { color: #007bff; text-align: center; }
            p { font-size: 16px; line-height: 1.5; }
            .button { display: block; width: fit-content; margin: 20px auto; padding: 10px 15px; background-color: #007bff; color: #fff; text-decoration: none; font-size: 16px; border-radius: 5px; text-align: center; }
        </style>
    </head>
    <body>
        <div class="container">
            <h2>Confirmación de compra</h2>
            <p>Hola <strong>${user.nombre}</strong>,</p>
            <p>Para confirmar la compra del vehículo <strong>${vehiculo.marca.nombreMarca} ${vehiculo.modelo}</strong>, haz clic en el siguiente enlace:</p>
            <a href="${confirmLink}" class="button">Confirmar compra</a>
            <p>Si no realizaste esta solicitud, ignora este mensaje.</p>
        </div>
    </body>
    </html>
    `;

    const opciones = {
        from: process.env.EMAIL_USER,
        subject: 'Confirmación de compra',
        to: destinatario,
        html: htmlContent 
    };

    try {
        const info = await config.sendMail(opciones);
        return res.status(200).json({
            ok: true,
            message: 'Correo enviado correctamente',
            info: info.response
        });
    } catch (error: any) {
        return res.status(500).json({
            ok: false,
            message: 'Error al enviar el correo',
            error: error.message
        });
    }
}

async function confirmRent(req: Request, res: Response) {
    const destinatario = req.body.destinatario;
    const idAlquiler = String(req.body.id);
    const confirmLinkRent = `http://localhost:4200/product/confirm-rent?id=${idAlquiler}`;
    const alquiler = await getOneById(idAlquiler);

    if (!alquiler) {
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

    const htmlContent = `
        <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; background-color: #f4f4f4;">
            <div style="max-width: 600px; background: #fff; padding: 20px; margin: auto; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                <h2 style="color: #333;">Confirmación de Alquiler</h2>
                <p style="color: #555;">Hola,</p>
                <p style="color: #555;">Has solicitado un alquiler y necesitamos que confirmes la operación.</p>
                <p style="color: #555;">Detalles del alquiler:</p>
                <ul style="text-align: left; color: #555; padding-left: 20px;">
                    <li><strong>Vehículo:</strong> ${alquiler.vehiculo?.marca.nombreMarca || 'N/A'} ${alquiler.vehiculo?.modelo || ''}</li>
                    <li><strong>Fecha de inicio:</strong> ${alquiler.fechaHoraInicioAlquiler}</li>
                    <li><strong>Fecha de devolución:</strong> ${alquiler.fechaHoraDevolucion}</li>
                </ul>
                <p style="color: #555;">Para confirmar el alquiler, haz clic en el siguiente botón:</p>
                <a href="${confirmLinkRent}" 
                   style="display: inline-block; padding: 12px 20px; background-color: #007bff; color: white; text-decoration: none; font-size: 16px; border-radius: 5px;">
                   Confirmar Alquiler
                </a>
                <p style="margin-top: 20px; color: #777;">Si no realizaste esta solicitud, ignora este mensaje.</p>
            </div>
        </div>
    `;

    const opciones = {
        from: process.env.EMAIL_USER,
        subject: 'Confirmación de Alquiler',
        to: destinatario,
        html: htmlContent
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


async function avisoPuntuarAlquiler(locatario: string, locador: string, alquiler: Alquiler) {
    if (!locador || !locatario || !alquiler) {
        console.log('Faltan datos para enviar el correo de calificación');
        return;
    }

    const locatarioLink = `http://localhost:4200/auth/rate/${locador}/${alquiler.id}`;
    const locadorLink = `http://localhost:4200/auth/rate/${locatario}/${alquiler.id}`;

    const config = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const generateEmailContent = (nombre: string, apellido: string, link: string) => `
        <div style="font-family: Arial, sans-serif; text-align: center; padding: 20px; background-color: #f4f4f4;">
            <div style="max-width: 600px; background: #fff; padding: 20px; margin: auto; border-radius: 10px; box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);">
                <h2 style="color: #333;">Califica tu experiencia</h2>
                <p style="color: #555;">Hola ${nombre} ${apellido},</p>
                <p style="color: #555;">Tu alquiler ha finalizado. A continuación, te mostramos algunos detalles:</p>
                <ul style="text-align: left; color: #555; padding-left: 20px;">
                    <li><strong>Fecha de reserva:</strong> ${alquiler.fechaAlquiler}</li>
                    <li><strong>Fecha de inicio:</strong> ${alquiler.fechaHoraInicioAlquiler}</li>
                    <li><strong>Fecha de devolución:</strong> ${alquiler.fechaHoraDevolucion}</li>
                    <li><strong>Vehículo:</strong> ${alquiler.vehiculo?.marca.nombreMarca || 'N/A'} ${alquiler.vehiculo?.modelo || ''}</li>
                </ul>
                <p style="color: #555;">Por favor, califica tu experiencia haciendo clic en el siguiente botón:</p>
                <a href="${link}" 
                   style="display: inline-block; padding: 12px 20px; background-color: #007bff; color: white; text-decoration: none; font-size: 16px; border-radius: 5px;">
                   Calificar ahora
                </a>
                <p style="margin-top: 20px; color: #777;">¡Gracias por usar nuestros servicios!</p>
            </div>
        </div>
    `;

    const opcionesLocatario = {
        from: process.env.EMAIL_USER,
        subject: 'Califica tu experiencia de alquiler',
        to: alquiler.locatario.mail,
        html: generateEmailContent(alquiler.locatario.nombre, alquiler.locatario.apellido, locatarioLink)
    };

    const opcionesLocador = {
        from: process.env.EMAIL_USER,
        subject: 'Califica tu experiencia de alquiler',
        to: alquiler.vehiculo.propietario.mail,
        html: generateEmailContent(alquiler.vehiculo.propietario.nombre, alquiler.vehiculo.propietario.apellido, locadorLink)
    };

    try {
        const [infoLocatario, infoLocador] = await Promise.all([
            config.sendMail(opcionesLocatario),
            config.sendMail(opcionesLocador)
        ]);

        console.log('Correos de calificación enviados correctamente', {
            locatario: infoLocatario.response,
            locador: infoLocador.response
        });
    } catch (error: any) {
        console.error('Error al enviar el correo de calificación', error.message);
    }
}


export { recuperarContraseña, confirmarCompra, avisoCompraExitosa , confirmRent, avisoPuntuarAlquiler
};

