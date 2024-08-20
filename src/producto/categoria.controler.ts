import { Request, Response, NextFunction } from "express";
import { orm } from "../shared/db/orm.js";
import { Categoria } from "./categoria.entity.js";



const em = orm.em

function sanitizeModeloInput(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    req.body.sanitizedInput = {
      nombreCategoria: req.body.nombreCategoria,
      descripcionCategoria: req.body.descripcionCategoria,
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
        const categorias = await em.find(Categoria,{})
        res.status(200).json( categorias )
        } catch (error: any) {
        res.status(500).json({ message: error.message })
        }
    }

    async function findOne(req: Request, res: Response) {
        try {
            const id = req.params.id;
            const categoria = await em.findOneOrFail(Categoria, { id })
            res.status(200).json({ message: 'Categoria Encontrada', data: categoria })
        } catch (error: any) {
            res.status(500).json({ message: error.message })
        }
    }

    async function add(req: Request, res: Response) {
        try {
        const categoria = em.create(Categoria, req.body.sanitizedInput)
        await em.flush()
        res.status(201).json({ message: 'Categoria creada', data: categoria })
        } catch (error: any) {
        res.status(500).json({ message: error.message })
        }
    }

    async function update(req: Request, res: Response) {
        try {
        const id = req.params.id
        const categoria = await em.findOneOrFail(Categoria, { id })
        em.assign(categoria, req.body.sanitizedInput)
        await em.flush()
        res.status(200).json(categoria )
        } catch (error: any) {
        res.status(500).json({ message: error.message })
        }
    }

    async function remove(req: Request, res: Response) {
        try {
        const id = req.params.id
        const categoria = em.getReference(Categoria, id)
        await em.removeAndFlush(categoria)
        res.status(200).json({ message: 'Categoria Eliminada' })
        } catch (error: any) {
        res.status(500).json({ message: error.message })
        }
    }

    export {findAll, findOne, add, update, remove, sanitizeModeloInput}