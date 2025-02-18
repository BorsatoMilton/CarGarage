import { Request, Response, NextFunction } from 'express'
import { Calificacion } from './calificacion.entity.js'
import { orm } from '../../shared/db/orm.js'

const em = orm.em

function sanitizeCalificacionInput(
  req: Request,
  res: Response,
  next: NextFunction
) {
  req.body.sanitizedInput = {
    fechaCalificacion: req.body.fechaCalificacion,
    valoracion: req.body.valoracion,
    comentario: req.body.comentario,
    usuario: req.body.usuario,
    alquiler: req.body.alquiler,
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
    const calificaciones = await em.find(Calificacion,{})
    res.status(200).json({ message: 'Calificaciones', data: calificaciones })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = req.params.id
    const calificacion = await em.findOneOrFail(Calificacion, { id })
    res.status(200).json({ message: 'Calificacion Encontrada', data: calificacion })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function findOneByRentAndUser(req: Request, res: Response) {
  try {
    const userId = req.params.userId
    const rentId = req.params.rentId
    const calificacion = await em.findOneOrFail(Calificacion, { usuario: userId, alquiler: rentId })
    res.status(200).json(calificacion)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function add(req: Request, res: Response) {
  try {
    const existe = await em.findOne(Calificacion, { usuario: req.body.usuario, alquiler: req.body.alquiler })
    if (existe) {
      return res.status(400).json({ message: 'Ya has calificado a este usuario por este alquiler.' })
    }else{
      const calificacion = em.create(Calificacion, req.body.sanitizedInput)
      await em.flush()
      res.status(201).json({ message: 'Calificacion creada', data: calificacion })
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = req.params.id
    const calificacionAactualizar = await em.findOneOrFail(Calificacion, { id })
    em.assign(calificacionAactualizar, req.body.sanitizedInput)
    await em.flush()
    res
      .status(200)
      .json({ message: 'Calificacion Actualizada', data: calificacionAactualizar })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = req.params.id
    const calificacion = em.getReference(Calificacion, id)
    await em.removeAndFlush(calificacion)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export { sanitizeCalificacionInput, findAll, findOne, findOneByRentAndUser, add, update, remove }