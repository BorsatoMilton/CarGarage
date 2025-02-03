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
    fechaAlquiler: new Date(),
    fechaHoraInicioAlquiler: req.body.fechaHoraInicioAlquiler,
    fechaHoraDevolucion: req.body.fechaHoraDevolucion,
    estadoAlquiler: req.body.estadoAlquiler,
    locatario: req.body.locatario,
    vehiculo: req.body.vehiculo,
    tiempoConfirmacion: (() => {
      const fecha = new Date()
      fecha.setDate(fecha.getDate() + 3)
      return fecha})(),
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
    const alquileres = await em.find(Alquiler,{}, { populate: ['locatario', 'vehiculo'] })	
    res.status(200).json(alquileres)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = req.params.id
    const alquiler = await em.findOneOrFail(Alquiler, { id }, { populate: ['locatario', 'vehiculo'] })
    res.status(200).json(alquiler)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function getOneById(idAlquiler: string) {
  try {
    const alquiler = await em.findOneOrFail(Alquiler, { id: idAlquiler }, { populate: ['locatario', 'vehiculo'] })
    return alquiler
  } catch (error: any) {
    return null
  }
}

async function findAllByVehicle(req: Request, res: Response) {
  try {
    const idVehiculo = req.params.id
    const alquileres = await em.find(Alquiler, { vehiculo: idVehiculo }, { populate: ['locatario', 'vehiculo'] })
    res.status(200).json(alquileres)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function add(req: Request, res: Response) {
  try {
    const alquiler = em.create(Alquiler, req.body.sanitizedInput)
    await em.flush()
    res.status(201).json(alquiler)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = req.params.id
    const alquilerAactualizar = await em.findOneOrFail(Alquiler, { id: id }, { populate: ['locatario', 'vehiculo'] })
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

export { sanitizeAlquilerInput, findAll, findAllByVehicle, findOne, getOneById, add, update, remove }