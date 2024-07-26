import { Request, Response, NextFunction } from "express";
import { Pedido } from "./pedido.entity.js";    
import { orm } from "../shared/db/orm.js";


const em = orm.em

function sanitizePedidoInput (
  req: Request,
  res: Response,
  next: NextFunction
) {
  req.body.sanitizedInput = 
    {
        fecha: req.body.fecha,
        usuario: req.body.usuario,
        lineacompra: req.body.lineacompra
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
        const pedidos = await em.find(Pedido,{})
        res.status(200).json({ message: 'Pedidos', data: pedidos })
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

async function findOne(req: Request, res: Response) {
    try {
        const id = req.params.id
        const pedido = await em.findOneOrFail(Pedido, { id })
        res.status(200).json({ message: 'Pedido Encontrado', data: pedido })
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

async function add(req: Request, res: Response) {
    try {
        const pedido = em.create(Pedido, req.body.sanitizedInput)
        await em.flush()
        res.status(201).json({ message: 'Pedido creado', data: pedido })
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

async function update(req: Request, res: Response) {
    try {
        const id = req.params.id
        const pedidoActualizar = await em.findOneOrFail(Pedido, { id })
        em.assign(pedidoActualizar, req.body.sanitizedInput)
        await em.flush()
        res.status(200).json({ message: 'Pedido actualizado', data: pedidoActualizar })
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

async function remove(req: Request, res: Response) {
    try {
        const id = req.params.id
        const pedido = em.getReference(Pedido, id)
        await em.removeAndFlush(pedido)
        res.status(200).json({ message: 'Pedido eliminado' })
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

export { sanitizePedidoInput, findAll, findOne, add, update, remove }