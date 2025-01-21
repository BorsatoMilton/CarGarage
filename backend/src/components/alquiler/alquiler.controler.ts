import { Request, Response, NextFunction } from 'express'
import { Alquiler } from './alquiler.entity.js'
import { orm } from '../../shared/db/orm.js'

const em = orm.em

function sanitizeAlquilerInput(
  req: Request,
  res: Response,
  next: NextFunction
) {
  req.body.sanitizedInput = {
    fechaAlquiler: req.body.fechaAlquiler,
    fechaHoraInicioAlquiler: req.body.fechaHoraInicioAlquiler,
    fechaHoraDevolucion: req.body.fechaHoraDevolucion,
    estadoAlquiler: req.body.estadoAlquiler,
    precioTotal: req.body.precioTotal,
    locador: req.body.locador,
    locatario: req.body.locatario,
    vehiculo: req.body.vehiculo,
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
    const alquileres = await em.find(Alquiler,{})
    res.status(200).json({ message: 'Alquilers', data: alquileres })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = req.params.id
    const alquiler = await em.findOneOrFail(Alquiler, { id })
    res.status(200).json({ message: 'Alquiler Encontrado', data: alquiler })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function add(req: Request, res: Response) {
  try {
    const alquiler = em.create(Alquiler, req.body.sanitizedInput)
    await em.flush()
    res.status(201).json({ message: 'Alquiler creado', data: alquiler })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = req.params.id
    const alquilerAactualizar = await em.findOneOrFail(Alquiler, { id })
    em.assign(alquilerAactualizar, req.body.sanitizedInput)
    await em.flush()
    res
      .status(200)
      .json({ message: 'Alquiler Actualizado', data: alquilerAactualizar })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = req.params.id
    const alquiler = em.getReference(Alquiler, id)
    await em.removeAndFlush(alquiler)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export { sanitizeAlquilerInput, findAll, findOne, add, update, remove }