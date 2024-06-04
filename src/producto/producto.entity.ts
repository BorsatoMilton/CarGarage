import crypto from 'node:crypto';

export class Producto{ 
    constructor(
        public nombre: string,
        public descripcion: string,
        public fechaAlta: Date,
        public stock: number,
        public imagen: string, // Cambiar el tipo a imagen
        public fechaBaja: Date | null = null,
        public idProducto = crypto.randomUUID(),

    ){}
}