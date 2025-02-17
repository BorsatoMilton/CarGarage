import { Request, Response, NextFunction } from 'express'
import { Alquiler } from './alquiler.entity.js'
import { orm } from '../../shared/db/orm.js'

const em = orm.em

function sanitizeAlquilerInput(
  req: Request,
  res: Response,
  next: NextFunction
) {
  req.body.sanitizedInput = {
    fechaAlquiler: new Date(),
    fechaHoraInicioAlquiler: req.body.fechaHoraInicioAlquiler,
    fechaHoraDevolucion: req.body.fechaHoraDevolucion,
    estadoAlquiler: req.body.estadoAlquiler,
    locatario: req.body.locatario,
    vehiculo: req.body.vehiculo,
    tiempoConfirmacion: (() => {
      const fecha = new Date()
      fecha.setMinutes(fecha.getDate() + 1)
      return fecha})(),
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
    const alquileres = await em.find(Alquiler, {}, { populate: ['locatario', 'vehiculo', 'vehiculo.propietario'] });
    res.status(200).json(alquileres);
  } catch (error: any) {
    res.status(500).json({ message: 'Error al obtener los alquileres', error: error.message });
  }
}

async function findOne(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const alquiler = await em.findOne(Alquiler, { id }, { populate: ['locatario', 'vehiculo', 'vehiculo.propietario'] });
    if(!alquiler){
      return res.status(404).json({ message: 'Alquiler no encontrado' });
    }
    res.status(200).json(alquiler);
  } catch (error: any) {
    res.status(500).json({ message: 'Error al obtener el Alquiler', error: error.message });
  }
}

async function getOneById(idAlquiler: string) {
  try {
    const alquiler = await em.findOneOrFail(Alquiler, { id: idAlquiler }, { populate: ['locatario', 'vehiculo', 'vehiculo.propietario', 'vehiculo.marca'] });
    return alquiler;
  } catch (error: any) {
    return null;
  }
}

async function findAllByVehicle(req: Request, res: Response) {
  try {
    const idVehiculo = req.params.id;
    const alquileres = await em.find(Alquiler, { vehiculo: idVehiculo }, { populate: ['locatario', 'vehiculo', 'vehiculo.propietario'] });
    res.status(200).json(alquileres);
  } catch (error: any) {
    res.status(500).json({ message: 'Error al obtener los alquileres por vehículo', error: error.message });
  }
}

async function findAllByUser(req: Request, res: Response) {
  try {
    const idUsuario = req.params.id;
    const alquileres = await em.find(Alquiler, { locatario: idUsuario }, { populate: ['locatario', 'vehiculo', 'vehiculo.propietario'] });
    res.status(200).json(alquileres);
  } catch (error: any) {
    res.status(500).json({ message: 'Error al obtener los alquileres por usuario', error: error.message });
  }
}

async function add(req: Request, res: Response) {
  try {
    const alquiler = em.create(Alquiler, req.body.sanitizedInput);
    await em.flush();
    res.status(201).json(alquiler);
  } catch (error: any) {
    res.status(500).json({ message: 'Error al crear el alquiler', error: error.message });
  }
}

async function update(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const alquilerAactualizar = await em.findOne(Alquiler, { id }, { populate: ['locatario', 'vehiculo', 'vehiculo.propietario'] });
    if (!alquilerAactualizar) {
      return res.status(404).json({ message: 'Alquiler no encontrado' });
    }
    em.assign(alquilerAactualizar, req.body.sanitizedInput);
    await em.flush();
    return res.status(200).json({ message: 'Alquiler Actualizado', data: alquilerAactualizar });
  } catch (error: any) {
    return res.status(500).json({ message: 'Error al actualizar el alquiler', error: error.message });
  }  
}

async function cancelRent(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const alquiler = em.getReference(Alquiler, id);
    alquiler.estadoAlquiler = 'CANCELADO';
    await em.flush();
    res.status(200).json({ message: 'Alquiler Cancelado', data: alquiler });
  } catch (error: any) {
    res.status(500).json({ message: 'Error al cancelar el alquiler', error: error.message });
  }
}

async function remove(req: Request, res: Response) {
  try {
    const id = req.params.id;
    const alquiler = em.getReference(Alquiler, id);
    if (!alquiler) {
      return res.status(404).json({ message: 'Alquiler no encontrado' });
    }
    await em.removeAndFlush(alquiler);
    res.status(200).json({ message: 'Alquiler eliminado', data: alquiler });
  } catch (error: any) {
    res.status(500).json({ message: 'Error al eliminar el alquiler', error: error.message });
  }
}

export { sanitizeAlquilerInput, findAll, findAllByVehicle, findAllByUser, findOne, getOneById, add, update, remove, cancelRent }