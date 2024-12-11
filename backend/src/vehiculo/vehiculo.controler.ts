import { Request, Response, NextFunction } from 'express'
import { Vehiculo } from './vehiculo.entity.js'
import { orm } from '../shared/db/orm.js'
import fs from 'fs';
import path from 'path';
import { ObjectId } from 'mongodb';

const em = orm.em.fork()

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
    kilometros: req.body.kilometros,
    precioVenta: req.body.precioVenta,
    precioAlquilerDiario: req.body.precioAlquilerDiario,
    modelo: req.body.modelo,
    marca: req.body.marca,
    categoria: req.body.categoria,
    propietario: req.body.propietario,
    transmision: req.body.transmision
    
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
    const vehiculos = await em.find(Vehiculo,{ fechaBaja: null},{populate: ['modelo']})
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
    const imagePaths = Array.isArray(req.files) ? req.files.map((file: any) => file.filename) : []; // a cada archivo que se envia se le va a poner el nombre, se trata de mapear, si no lo deja vacio. el imagepaths muestra los nombres del archivo si lo q se envia es un array
    if (!ObjectId.isValid(req.body.sanitizedInput.marca) || 
      !ObjectId.isValid(req.body.sanitizedInput.categoria) || 
      !ObjectId.isValid(req.body.sanitizedInput.propietario)) {
        return res.status(400).json({ message: 'IDs inválidos' });
      }

    const vehiculoData = {
      ...req.body.sanitizedInput, //spread operator para copiar todas las propiedades de
      marca: ObjectId.createFromHexString(req.body.sanitizedInput.marca),
      categoria: ObjectId.createFromHexString(req.body.sanitizedInput.categoria), 
      propietario: ObjectId.createFromHexString(req.body.sanitizedInput.propietario),
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

async function logicRemove(req: Request, res:Response) { // se utiliza a la hora de establecer una fecha de baja, es una baja logica, no fisica
  try {
    const id = req.params.id
    const vehiculo = await em.findOneOrFail(Vehiculo, { id })
    vehiculo.fechaBaja = new Date()
    await em.flush()
    res.status(200).json({ message: 'Vehiculo dado de baja', data: vehiculo })
  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
  
}


async function remove(req: Request, res: Response) {
  try {
  const id = req.params.id;

  const vehiculo = await em.findOne(Vehiculo, { id });
  if (!vehiculo) {
    return res.status(404).json({ message: 'Vehículo no encontrado' });
  }

  const imagePaths = vehiculo.imagenes.map((imageName: string) => 
    path.resolve('src/uploads', imageName)
  );

 
  const unlinkPromises = imagePaths.map((imagePath) => {
    return new Promise((resolve, reject) => {
      fs.unlink(imagePath, (err) => {
        if (err) {
          console.error('Error al eliminar la imagen:', err);
          return reject(err);
        }
        console.log('Imagen eliminada correctamente:', imagePath);
        resolve(true);
      });
    });
  });
  
  await Promise.all(unlinkPromises);

  
  await em.removeAndFlush(vehiculo);
  res.status(200).json({ message: 'Vehículo y sus imágenes eliminados correctamente' });

  } catch (error: any) {
    res.status(500).json({ message: error.message })
  }
}

export { sanitizeVehiculoInput, findAll, findOne, add, update, remove, logicRemove }