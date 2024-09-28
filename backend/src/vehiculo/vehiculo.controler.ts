import { Request, Response, NextFunction } from 'express'
import { Vehiculo } from './vehiculo.entity.js'
import { orm } from '../shared/db/orm.js'
import fs from 'fs';
import path from 'path';

const em = orm.em

function sanitizeVehiculoInput(
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
    precioAlquilerDiario: req.body.precioAlquilerDiario,
    modelo: req.body.modelo,
    marca: req.body.marca,
    categoria: req.body.categoria
    
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
    const vehiculos = await em.find(Vehiculo,{},{populate: ['modelo']})
    res.status(200).json(vehiculos)
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = req.params.id
    const vehiculo = await em.findOneOrFail(Vehiculo, { id }, { populate: ['modelo'] })
    res.status(200).json({ message: 'Vehiculo Encontrado', data: vehiculo })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function add(req: Request, res: Response) {
  try {
    const imagePaths = Array.isArray(req.files) ? req.files.map((file: any) => file.filename) : [];

    const vehiculoData = {
      ...req.body.sanitizedInput,
      imagenes: imagePaths 
    };
    const vehiculo = em.create(Vehiculo, vehiculoData);
  
    await em.flush();
    res.status(201).json({ message: 'Vehiculo creado', data: vehiculo });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = req.params.id
    const vehiculoAactualizar = await em.findOneOrFail(Vehiculo, { id })
    em.assign(vehiculoAactualizar, req.body.sanitizedInput)
    await em.flush()
    res
      .status(200)
      .json({ message: 'Vehiculo Actualizado', data: vehiculoAactualizar })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = req.params.id
    const vehiculo = em.getReference(Vehiculo, id)
    await em.removeAndFlush(vehiculo)
    //CHEQUEAR ACA PORQUE NO BORRA LAS IMAGENES (MILTON)
    vehiculo.imagenes.forEach((imageName: string) => {
      const imagePath = path.resolve('src/uploads', imageName); 

      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error('Error al eliminar la imagen:', err);
        } else {
          console.log('Imagen eliminada correctamente:', imagePath);
        }
      });
    });

    res.status(200).json({ message: 'Vehiculo Eliminado' })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export { sanitizeVehiculoInput, findAll, findOne, add, update, remove }