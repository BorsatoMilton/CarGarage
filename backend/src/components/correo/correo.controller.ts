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


async function avisoPuntuarAlquiler(locatario: string, locador: string,alquiler: Alquiler) {
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

    const htmlContentLocatario = `
      <h2>Califica tu experiencia</h2>
      <p>Hola,</p>
      <p>Tu alquiler ha finalizado. A continuación, te mostramos algunos detalles:</p>
      <ul>
        <li><strong>Locador:</strong> ${alquiler.vehiculo.propietario.nombre} ${alquiler.vehiculo.propietario.apellido}</li>
        <li><strong>Fecha que se realizo la Reserva:</strong> ${alquiler.fechaAlquiler}</li>
        <li><strong>Fecha de inicio:</strong> ${alquiler.fechaHoraInicioAlquiler}</li>
        <li><strong>Fecha de devolución:</strong> ${alquiler.fechaHoraDevolucion}</li>
        <li><strong>Vehículo:</strong> ${alquiler.vehiculo?.marca.nombreMarca || 'N/A'} ${alquiler.vehiculo?.modelo || ''}</li>
      </ul>
      <p>Por favor, <a href="${locatarioLink}">califica tu experiencia</a>.</p>
      <p>¡Gracias!</p>
    `;
  
    const htmlContentLocador = `
      <h2>Califica tu experiencia</h2>
      <p>Hola,</p>
      <p>El alquiler ha finalizado. A continuación, te mostramos algunos detalles:</p>
      <ul>
        <li><strong>Locatario:</strong> ${alquiler.locatario.nombre} ${alquiler.locatario.apellido}</li>
        <li><strong>Fecha que se realizo la Reserva:</strong> ${alquiler.fechaAlquiler}</li>
        <li><strong>Fecha de inicio:</strong> ${alquiler.fechaHoraInicioAlquiler}</li>
        <li><strong>Fecha de devolución:</strong> ${alquiler.fechaHoraDevolucion}</li>
        <li><strong>Vehículo:</strong> ${alquiler.vehiculo?.marca.nombreMarca || 'N/A'} ${alquiler.vehiculo?.modelo || ''}</li>
      </ul>
      <p>Por favor, <a href="${locadorLink}">califica tu experiencia</a>.</p>
      <p>¡Gracias!</p>
    `;
  
    const opcionesLocatario = {
      from: process.env.EMAIL_USER,
      subject: 'Califica tu experiencia de alquiler',
      to: alquiler.locatario.mail,
      html: htmlContentLocatario
    };
  
    const opcionesLocador = {
      from: process.env.EMAIL_USER,
      subject: 'Califica tu experiencia de alquiler',
      to: alquiler.vehiculo.propietario.mail,
      html: htmlContentLocador
    };
  
    try {
      const infoLocatario = await config.sendMail(opcionesLocatario);
      const infoLocador = await config.sendMail(opcionesLocador);
      console.log('Correos de calificación enviados correctamente', {
        locatario: infoLocatario.response,
        locador: infoLocador.response
      });
    } catch (error: any) {
      console.error('Error al enviar el correo de calificación', error.message);
    }
  }

export { envioCorreo, confirmarCompra, avisoCompraExitosa , confirmRent, avisoPuntuarAlquiler
};

