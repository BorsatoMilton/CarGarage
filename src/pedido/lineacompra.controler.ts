import { Request, Response, NextFunction } from "express";
import { orm } from "../shared/db/orm.js";
import {lineacompra} from "./lineacompra.entity.js";

const em = orm.em

function sanitizelineacompraInput(
    req: Request,
    res: Response,
    next: NextFunction
) {
    req.body.sanitizedInput = {
        cantidad: req.body.cantidad,
        precio: req.body.precio,
        producto: req.body.producto,
        pedido: req.body.pedido
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
    const lineas = await em.find(lineacompra,{})
    res.status(200).json({ message: 'Lineas', data: lineas })
    } catch (error: any) {
    res.status(500).json({ message: error.message })
    }
}

async function findOne(req: Request, res: Response) {
    try {
        const id = req.params.id;
        const linea = await em.findOneOrFail(lineacompra, { id })
        res.status(200).json({ message: 'Linea Encontrada', data: linea })
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

async function add(req: Request, res: Response) {
    try {
    const linea = em.create(lineacompra, req.body)
    await em.flush()
    res.status(201).json({ message: 'Linea creada', data: linea })
    } catch (error: any) {
    res.status(500).json({ message: error.message })
    }
}

async function update(req: Request, res: Response) {
    try {
    const id = req.params.id
    const linea = await em.findOneOrFail(lineacompra, { id })
    em.assign(linea, req.body)
    await em.flush()
    res.status(200).json({ message: 'Linea actualizada', data: linea })
    } catch (error: any) {
    res.status(500).json({ message: error.message })
    }
}

async function remove(req: Request, res: Response) {
    try {
    const id = req.params.id
    const linea = em.getReference(lineacompra, id)
   await em.removeAndFlush(linea)
    res.status(200).json({ message: 'Linea eliminada', data: linea })
    } catch (error: any) {
    res.status(500).json({ message: error.message })
    }
}
    
export { findAll, findOne, add, update, remove, sanitizelineacompraInput }
