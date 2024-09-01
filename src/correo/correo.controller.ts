import { Request, Response } from 'express';
import nodemailer from 'nodemailer';

async function envioCorreo (req: Request, res: Response)  {
    
    const asunto = req.body.asunto;
    const destinatario = req.body.destinatario;
    const mensaje = req.body.mensaje;

    const config = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false,
        auth: {
            user: '', 
            pass: ''
        }
    });

    const opciones = {
        from: 'cargarage153@gmail.com',
        subject: asunto,
        to: destinatario,
        text: mensaje
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

export { envioCorreo };

