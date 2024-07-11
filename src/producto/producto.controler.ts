import { Request, Response, NextFunction } from 'express'
import { Producto } from './producto.entity.js'
import { orm } from '../shared/db/orm.js'

const em = orm.em

function sanitizeProductoInput(
  req: Request,
  res: Response,
  next: NextFunction
) {
  req.body.sanitizedInput = {
    nombre: req.body.nombre,
    descripcion: req.body.descripcion,
    fechaAlta: req.body.fechaAlta,
    fechaBaja: req.body.fechaBaja,
    stock: req.body.stock,
    precioVenta: req.body.precioVenta,
    modelo: req.body.modelo,
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
    const productos = await em.find(Producto,{},{populate: ['modelo']})
    res.status(200).json({ message: 'Productos', data: productos })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = req.params.id
    const producto = await em.findOneOrFail(Producto, { id }, { populate: ['modelo'] })
    res.status(200).json({ message: 'Producto Encontrado', data: producto })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function add(req: Request, res: Response) {
  try {
    const producto = em.create(Producto, req.body.sanitizedInput)
    await em.flush()
    res.status(201).json({ message: 'Producto creado', data: producto })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

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

async function remove(req: Request, res: Response) {
  try {
    const id = req.params.id
    const producto = em.getReference(Producto, id)
    await em.removeAndFlush(producto)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export { sanitizeProductoInput, findAll, findOne, add, update, remove }