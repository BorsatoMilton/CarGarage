import crypto from 'node:crypto';

export class Subasta{
    constructor(
        public fechaAlta: Date,
        public fechaHora: Date,
        public precioBaseEntrada: number,
        public precioCierre: number,
        public idSubasta = crypto.randomUUID(),
    ){}
}