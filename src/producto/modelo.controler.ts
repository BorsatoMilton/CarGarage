import { Request, Response, NextFunction } from "express";
import { orm } from "../shared/db/orm.js";
import { Modelo } from "./modelo.entity.js";
import { Marca } from "./marca.entity.js";


const em = orm.em

function sanitizeModeloInput(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    req.body.sanitizedInput = {
      nombreModelo: req.body.nombreModelo,
      descripcionModelo: req.body.descripcionModelo,
      marca: req.body.marca,
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
        const modelos = await em.find(Modelo,{})
        res.status(200).json({ message: 'Modelos', data: modelos })
        } catch (error: any) {
        res.status(500).json({ message: error.message })
        }
    }

    async function findOne(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const modelo = await em.findOneOrFail(Modelo, { id })
            res.status(200).json({ message: 'Modelo Encontrado', data: modelo })
        } catch (error: any) {
            res.status(500).json({ message: error.message })
        }
    }

    async function add(req: Request, res: Response) {
        try {
        const modelo = em.create(Modelo, req.body.sanitizedInput)
        await em.flush()
        res.status(201).json({ message: 'Modelo creado', data: modelo })
        } catch (error: any) {
        res.status(500).json({ message: error.message })
        }
    }

    async function update(req: Request, res: Response) {
        try {
        const id = req.params.id
        const modelo = await em.findOneOrFail(Modelo, { id })
        em.assign(modelo, req.body.sanitizedInput)
        await em.flush()
        res.status(200).json({ message: 'Modelo actualizado', data: modelo })
        } catch (error: any) {
        res.status(500).json({ message: error.message })
        }
    }

    async function remove(req: Request, res: Response) {
        try {
        const id = req.params.id
        const modelo = em.getReference(Modelo, id)
        await em.removeAndFlush(modelo)
        res.status(200).json({ message: 'Modelo eliminado' })
        } catch (error: any) {
        res.status(500).json({ message: error.message })
        }
    }

    export {findAll, findOne, add, update, remove, sanitizeModeloInput}