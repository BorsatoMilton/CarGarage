import { Request, Response, NextFunction } from "express";
import {UsuarioRepository} from './usuario.repository.js';
import { Usuario } from "./usuario.entity.js";

const repository = new UsuarioRepository(); 

function sanitizeUserInput(req: Request, res: Response, next: NextFunction){
    req.body.sanitizedInput = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        correo: req.body.correo,
        usuario: req.body.usuario,
        contrasena: req.body.contrasena,
        direccion: req.body.direccion
    }
    Object.keys(req.body.sanitizedInput).forEach(key => {
        if(req.body.sanitizedInput[key] === undefined){
            delete req.body.sanitizedInput[key]
        }
    });
    next();
}

function findAll(req: Request, res:Response){
    res.json({data: repository.findAll()})
}

function findOne(req: Request, res: Response){
    const id = req.params.id;
    const usuario = repository.findOne({id});

    if (!usuario){
        return res.status(404).json({message: 'Usuario no encontrado'})

    }
    res.json({data: usuario})}

function add(req: Request, res: Response){
    const input = req.body.sanitizedInput;

    const nuevoUsuario = new Usuario(
        input.nombre,
        input.apellido,
        input.correo,
        input.usuario,
        input.contrasena,
        input.direccion
    );
    const usuario = repository.add(nuevoUsuario);
    return res.status(201).json({message: 'Usuario Creado con exito!', data: usuario})
}

function update(req: Request, res: Response){
    req.body.sanitizedInput.idUsuario = req.params.id;
    const usuario = repository.update(req.body.sanitizedInput);
    if(!usuario){
        return res.status(404).json({message: 'Usuario no encontrado'})
    }
    return res.status(200).json({message: 'Usuario actualizado con exito!', data: usuario})
}

function remove(req: Request, res: Response){
    const id = req.params.id;
    const usuario = repository.delete({id});
    if(!usuario){
        return res.status(404).json({message: 'Usuario no encontrado'})
    }else {
        return res.status(200).json({message: 'Usuario eliminado con exito!', data: usuario})

    }

}
export {sanitizeUserInput, findAll, findOne, add, update, remove}