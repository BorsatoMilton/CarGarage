import { Request, Response, NextFunction } from "express";
import { Compra } from "./compra.entity.js";
import { orm } from "../shared/db/orm.js";


const em = orm.em

function sanitizeCompraInput (
  req: Request,
  res: Response,
  next: NextFunction
) {
  req.body.sanitizedInput = 
    {
        fechaCompra: new Date(),
        fechaLimitePago: (() => {
            const fecha = new Date(); 
            fecha.setDate(fecha.getDate() + 7); 
            return fecha; 
        })(),
        fechaCancelacion:req.body.fechaCancelacion,
        usuario: req.body.comprador,
        vehiculo: req.body.vehiculo
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
        const compras = await em.find(Compra,{}, { populate: ['usuario', 'vehiculo'] })
        res.status(200).json(compras)
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

async function findAllByUser(req: Request, res: Response) {
    try {
        const idComprador = req.params.id
        const compras = await em.find(Compra, { usuario: idComprador }, { populate: ['usuario', 'vehiculo'] })
        res.status(200).json(compras)
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

async function findOne(req: Request, res: Response) {
    try {
        const id = req.params.id
        const compra = await em.findOneOrFail(Compra, { id }, { populate: ['usuario', 'vehiculo'] })
        res.status(200).json(compra)
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

async function add(req: Request, res: Response) {
    try {
        const compra = em.create(Compra, req.body.sanitizedInput)
        await em.flush()
        res.status(201).json(compra)
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

async function cancelarCompra(req: Request, res: Response) {
    try {
        const id = req.body.id
        if (!id) {
      return res.status(400).json({ message: "El id de la compra es requerido" });
        }
        const compraActualizar = await em.findOneOrFail(Compra, { id })
        em.assign(compraActualizar, { fechaCancelacion: new Date() })
        await em.flush()
        res.status(200).json({ message: 'Compra actualizado', data: compraActualizar })
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

async function remove(req: Request, res: Response) {
    try {
        const id = req.params.id
        const compra = em.getReference(Compra, id)
        await em.removeAndFlush(compra)
        res.status(200).json({ message: 'Compra eliminado' })
    } catch (error: any) {
        res.status(500).json({ message: error.message })
    }
}

export { sanitizeCompraInput, findAll, findAllByUser, findOne, add, cancelarCompra, remove }