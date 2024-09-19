import { Request, Response, NextFunction } from 'express'
import { Rol } from './rol.entity.js'
import { orm } from '../shared/db/orm.js'
import { PasswordResetToken } from './passwordResetToken.entity.js'

const em = orm.em

function sanitizeRolInput(
  req: Request,
  res: Response,
  next: NextFunction
) {
  req.body.sanitizedInput = {
    nombreRol: req.body.nombreRol,
    rol: req.body.rol,
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
    res.status(200).json({ message: 'Roles', data: roles })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = req.params.id
    const rol = await em.findOneOrFail(Rol, { id })
    res.status(200).json({ message: 'Rol Encontrado', data: rol })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function add(req: Request, res: Response) {
  try {
    const rol = em.create(Rol, req.body.sanitizedInput)
    await em.flush()
    res.status(201).json({ message: 'Rol creado', data: rol })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = req.params.id
    const rolAactualizar = await em.findOneOrFail(Rol, { id })
    em.assign(rolAactualizar, req.body.sanitizedInput)
    await em.flush()
    res
      .status(200)
      .json({ message: 'Rol Actualizado', data: rolAactualizar })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = req.params.id
    const rol = em.getReference(Rol, id)
    await em.removeAndFlush(rol)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export { sanitizeRolInput, findAll, findOne, add, update, remove}