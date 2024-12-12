import { Request, Response, NextFunction } from 'express'
import { Usuario } from './usuario.entity.js'
import { orm } from '../shared/db/orm.js'
import { PasswordResetToken } from './passwordResetToken.entity.js'
import bcrypt from 'bcrypt';


const em = orm.em

function sanitizeUsuarioInput(
  req: Request,
  res: Response,
  next: NextFunction
) {
  req.body.sanitizedInput = {
    usuario: req.body.usuario,
    clave: req.body.clave,
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    mail: req.body.mail,
    direccion: req.body.direccion,
    tarjeta: req.body.tarjeta,
    calificacion: req.body.calificacion,
    alquiler: req.body.alquiler,
    rol: req.body.rol
  }

  Object.keys(req.body.sanitizedInput).forEach((key) => {
    if (req.body.sanitizedInput[key] === undefined) {
      delete req.body.sanitizedInput[key]
    }
  })
  next()
}

async function findAll(req: Request, res: Response) {
  try {
    const usuarios = await em.find(Usuario,{})
    res.status(200).json(usuarios)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function findOneByEmailOrUsername(req: Request, res: Response) {
  try {
    const usuario = req.params.user
    const mail = req.params.mail
    const usuarioEncontrado = await em.findOne(Usuario, {
      $or: [
      { usuario: usuario},
      { mail: mail }]
      });
    res.status(200).json(usuarioEncontrado)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function findOneById(req: Request, res: Response) {
  try {
    const id = req.params.id
    const usuario = await em.findOneOrFail(Usuario, { id })
    res.status(200).json({ message: 'Usuario Encontrado', data: usuario })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function findOneByEmail(email:string){
  const usuario = await em.findOne(Usuario, { mail: email })
  try {
    return usuario
  }
  catch (error: any) {
    return error.message
  }
}



async function findOneByUser(req: Request, res: Response) {
  try {
    const user = req.params.user
    const usuario = await em.findOne(Usuario, { usuario : user})
    res.status(200).json(usuario)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}


async function login(req: Request, res: Response) {
  try {
    const usuario = req.body.user;
    const clave = req.body.password;
    const usuarioEncontrado = await em.findOne(Usuario, { usuario: usuario });

    if (!usuarioEncontrado) {
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }else{
      const isMatch = await bcrypt.compare(clave, usuarioEncontrado.clave);
      if (!isMatch) {
        return res.status(401).json({ message: 'Contraseña incorrecta' });
      }
      
      res.status(200).json(usuarioEncontrado);
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}


async function add(req: Request, res: Response) {
  
  try {
    const vecesHash = 10;
    const hashClave = await bcrypt.hash(req.body.sanitizedInput.clave, vecesHash);
    const usuario = em.create(Usuario, {
      ...req.body.sanitizedInput,
      clave: hashClave
    })
    await em.flush()
    res.status(201).json({ message: 'Usuario creado', data: usuario })
  } catch (error: any) {
    console.error(error); 
    res.status(500).json({ message: error.message })
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = req.params.id
    const usuarioAactualizar = await em.findOneOrFail(Usuario, { id })
    const vecesHash = 10;
    const hashClave = await bcrypt.hash(req.body.sanitizedInput.clave, vecesHash);
    const usuario = {
      ...req.body.sanitizedInput,
      clave: hashClave
    }
    em.assign(usuarioAactualizar, usuario)
    await em.flush()
    res
      .status(200)
      .json({ message: 'Usuario Actualizado', data: usuarioAactualizar })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function resetPassword(req: Request, res: Response) {
  const { token, newPassword } = req.body;

  const tokenEntity = await orm.em.findOne(PasswordResetToken, { token });
  if (!tokenEntity || tokenEntity.expiryDate < new Date()) {
    return res
      .status(400)
      .json({ ok: false, message: "Token inválido o expirado" });
  }

  const user = await orm.em.findOne(Usuario, tokenEntity.user.id);
  if (!user) {
    return res
      .status(404)
      .json({ ok: false, message: "Usuario no encontrado" });
  }
  const vecesHash = 10;
  const hashClave = await bcrypt.hash(newPassword, vecesHash);
  user.clave = hashClave;
  await orm.em.persistAndFlush(user);
  await orm.em.removeAndFlush(tokenEntity);
  return res
    .status(200)
    .json({ ok: true, message: "Contraseña actualizada exitosamente" });
}


async function remove(req: Request, res: Response) {
  try {
    const id = req.params.id
    const usuario = em.getReference(Usuario, id)
    await em.removeAndFlush(usuario)
    res.status(200).json("Usuario eliminado con exito")
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export { sanitizeUsuarioInput, findAll, findOneById,findOneByEmail, findOneByUser, resetPassword, add, update, remove, login, findOneByEmailOrUsername}