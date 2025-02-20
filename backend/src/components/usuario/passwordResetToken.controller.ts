import { Request, Response } from 'express'
import { orm } from '../../shared/db/orm.js'
import { PasswordResetToken } from './passwordResetToken.entity.js'
import { findOneByEmail } from './usuario.controler.js'
import { generateToken } from '../../shared/db/tokenGenerator.js'
import { recuperarContraseña } from '../correo/correo.controller.js'

const em = orm.em

async function addToken(req: Request, res: Response) {
  const destinatario = req.body.destinatario;
  const user = await findOneByEmail(destinatario);
  if (!user) {
    return res.status(404).json({ ok: false, message: 'Usuario no encontrado' });
  }
  const token = generateToken();
  try {
    const passwordResetToken = em.create(PasswordResetToken, {
      token,
      user,
      expiryDate: new Date(Date.now() + 3600000),
      used: false
    });
    await em.persistAndFlush(passwordResetToken);

    const correoResultado = await recuperarContraseña(token, user);
    
    if (!correoResultado.ok) {
      return res.status(500).json({ ok: false, message: correoResultado.message, error: correoResultado.info });
    }
    res.status(201).json({ ok: true, message: 'Token creado y correo enviado', info: correoResultado.info });
  } catch (error: any) {
    res.status(500).json({ ok: false, message: 'Error al crear el token', error: error.message });
  }
}

async function validateToken(req: Request, res: Response) {
    const token = req.params.token;
    const passwordResetToken = await em.findOne(PasswordResetToken, { token });
    if (!passwordResetToken) {
        return res.status(404).json({ ok: false, message: 'Token no encontrado' });
    }
    if (passwordResetToken.used) {
        return res.status(400).json({ ok: false, message: 'Token ya utilizado' });
    }
    if (passwordResetToken.expiryDate < new Date()) {
        return res.status(400).json({ ok: false, message: 'Token expirado' });
    }
    res.status(200).json({ ok: true, message: 'Token válido' });
  }

async function usedToken(req: Request, res: Response) {
    const token = req.params.token;
    const passwordResetToken = await em.findOneOrFail(PasswordResetToken, { token: token });
    if (!passwordResetToken) {
        return res.status(404).json({ ok: false, message: 'Token no encontrado' });
    }
    if (passwordResetToken.used) {
        return res.status(400).json({ ok: false, message: 'Token ya utilizado' });
    }
    passwordResetToken.used = true;
    try {
        await em.persistAndFlush(passwordResetToken);
        res.status(200).json({ ok: true, message: 'Token utilizado' });
    } catch (error: any) {
        res.status(500).json({ ok: false, message: 'Error al utilizar el token', error: error.message });
    }
  }


export{ addToken, validateToken, usedToken }  