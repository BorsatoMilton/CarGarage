import { Image } from "./imagen.entity.js";
import { Vehiculo } from "./vehiculo.entity.js";
import { Request, Response } from 'express';
import { orm } from "../shared/db/orm.js";
const em = orm.em;
export const uploadImage = async (req:Request, res:Response) => {
    try {
        const { filename, contentType, data, vehiculoId } = req.body;
        const vehiculo = await em.findOne(Vehiculo, {_id: vehiculoId});
    if (!vehiculo) {
        return res.status(404).json({message: 'Vehiculo no encontrado'});
    }

    const image = new Image();
    image.filename = filename;
    image.contentType = contentType;
    image.data = Buffer.from(data, 'base64');
    image.vehiculo = vehiculo;

    await em.persistAndFlush(image);
    res.status(201).json({message: 'Imagen subida correctamente'});
    } catch (error) {
        res.status(500).json({message: 'Error al subir la imagen'});
    }
};

export const getImage = async (req:Request, res:Response) => {
    try {
        const { filename } = req.params;
        const image = await em.findOne(Image, {filename});
        if (!image) {
            return res.status(404).json({message: 'Imagen no encontrada'});
        }

        res.set('Content-Type', image.contentType);
        res.send(image.data);
    } catch (error) {
        console.error('Error al obtener imagen',error);
        res.status(500).json({message: 'Error al obtener la imagen'});
    }
};
