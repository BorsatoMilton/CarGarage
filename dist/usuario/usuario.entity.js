import crypto from 'node:crypto';
export class Usuario {
    constructor(nombre, apellido, correo, usuario, contrasena, direccion, idUsuario = crypto.randomUUID()) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.correo = correo;
        this.usuario = usuario;
        this.contrasena = contrasena;
        this.direccion = direccion;
        this.idUsuario = idUsuario;
    }
}
//# sourceMappingURL=usuario.entity.js.map