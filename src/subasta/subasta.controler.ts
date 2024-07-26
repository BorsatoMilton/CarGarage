import { Request, Response, NextFunction } from 'express'
import { Subasta } from './subasta.entity.js'
import { orm } from '../shared/db/orm.js'

const em = orm.em

function sanitizeProductoInput(
  req: Request,
  res: Response,
  next: NextFunction
) {
  req.body.sanitizedInput = {
    idsubasta: req.body.idsubasta,
    fechaAlta: req.body.fechaAlta,
    fechaHora: req.body.fechaHora,
    precio_base_entrada: req.body.precio_base_entrada,
    precio_cierre: req.body.precio_cierre,
    usuario: req.body.usuario,
    producto: req.body.producto,
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
    const subastas = await em.find(Subasta,{},{populate: ['usuario']})
    res.status(200).json({ message: 'Subastas', data: subastas })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = req.params.id
    const subasta = await em.findOneOrFail(Subasta, { id }, { populate: ['usuario'] })
    res.status(200).json({ message: 'Subasta Encontrada', data: subasta })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function add(req: Request, res: Response) {
  try {
    const subasta = em.create(Subasta, req.body.sanitizedInput)
    await em.flush()
    res.status(201).json({ message: 'Subasta creada correctamente', data: subasta })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = req.params.id
    const subastaAactualizar = await em.findOneOrFail(Subasta, { id })
    em.assign(subastaAactualizar, req.body.sanitizedInput)
    await em.flush()
    res
      .status(200)
      .json({ message: 'Subasta actualizada con exito', data: subastaAactualizar })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = req.params.id
    const subasta = em.getReference(Subasta, id)
    await em.removeAndFlush(subasta)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export { sanitizeProductoInput, findAll, findOne, add, update, remove }