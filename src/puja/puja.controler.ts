import { Request, Response, NextFunction } from 'express'
import { Puja } from './puja.entity.js'
import { orm } from '../shared/db/orm.js'

const em = orm.em

function sanitizeProductoInput(
  req: Request,
  res: Response,
  next: NextFunction
) {
  req.body.sanitizedInput = {
    fecha_puja: req.body.fecha_puja,
    monto: req.body.monto,
    subasta: req.body.subasta,
    usuario: req.body.usuario,
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
    const pujas = await em.find(Pujas,{},{populate: ['usuario']})
    res.status(200).json({ message: 'Pujas', data: pujas })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const fecha_puja = req.params.fecha_puja
    const puja = await em.findOneOrFail(Puja, { fecha_puja }, { populate: ['usuario'] })
    res.status(200).json({ message: 'Puja Encontrada', data: puja })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function add(req: Request, res: Response) {
  try {
    const producto = em.create(Puja, req.body.sanitizedInput)
    await em.flush()
    res.status(201).json({ message: 'Puja creada con exito', data: Puja })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}
/*
async function update(req: Request, res: Response) {
  try {
    const id = req.params.id
    const productoAactualizar = await em.findOneOrFail(Producto, { id })
    em.assign(productoAactualizar, req.body.sanitizedInput)
    await em.flush()
    res
      .status(200)
      .json({ message: 'Producto Actualizado', data: productoAactualizar })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}
No creo que pueda actualizarce una puja, ya que su fehca va a ser unica y su monto tambien */

async function remove(req: Request, res: Response) {
  try {
    const fecha_puja = req.params.fecha_puja
    const puja = em.getReference(Puja, fecha_puja)
    await em.removeAndFlush(puja)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export { sanitizeProductoInput, findAll, findOne, add, /*update*/ remove }