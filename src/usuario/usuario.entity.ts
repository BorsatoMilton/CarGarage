import crypto from 'node:crypto';

export class Usuario{ 
    constructor(
        public nombre: string,
        public apellido: string,
        public correo: string,
        public usuario: string,
        public contrasena: string,
        public direccion: string,
        public idUsuario = crypto.randomUUID(),

    ){}
}