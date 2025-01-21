import { Request, Response, NextFunction } from 'express'
import { Rol } from './rol.entity.js'
import { orm } from '../../shared/db/orm.js'
import { PasswordResetToken } from './passwordResetToken.entity.js'

const em = orm.em

function sanitizeRolInput(
  req: Request,
  res: Response,
  next: NextFunction
) {
  req.body.sanitizedInput = {
    nombreRol: req.body.nombreRol,
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
    const roles = await em.find(Rol,{})
    res.status(200).json(roles)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function findOneByName(req: Request, res: Response) {
  try {
    const name = req.params.name.toUpperCase();
    const rol = await em.findOneOrFail(Rol, { nombreRol: name })
    res.status(200).json(rol)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}


async function findOneById(req: Request, res: Response) {
  try {
    const id = req.params.id
    const rol = await em.findOneOrFail(Rol, { id })
    res.status(200).json(rol)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function add(req: Request, res: Response) {
  try {
    req.body.sanitizedInput.nombreRol = req.body.sanitizedInput.nombreRol.toUpperCase()
    const rolExistente = await em.findOne(Rol, {
      nombreRol: req.body.sanitizedInput.nombreRol,
    })
    if (rolExistente) {
      return res.status(400).json({ message: 'El rol ya existe' })
    }else{
      const rol = em.create(Rol, req.body.sanitizedInput)
      await em.flush()
      res.status(201).json({ message: 'Rol creado', data: rol })
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = req.params.id
    const rolAactualizar = await em.findOneOrFail(Rol, { id })
    if (!rolAactualizar) {
      return res.status(400).json({ message: 'El rol no existe' })
    }else{
      em.assign(rolAactualizar, req.body.sanitizedInput)
      await em.flush()
      res
        .status(200)
        .json(rolAactualizar)
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = req.params.id
    const rol = em.getReference(Rol, id)
    if(!rol){
      return res.status(404).json({ message: 'Rol no encontrado' })
    }else{
      await em.removeAndFlush(rol)
      res.status(200).json({ message: 'Rol eliminado correctamente' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export { sanitizeRolInput, findAll, findOneByName, findOneById, add, update, remove}