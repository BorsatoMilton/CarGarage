import crypto from 'node:crypto';
export class Subasta {
    constructor(fechaAlta, fechaHora, precioBaseEntrada, precioCierre, idSubasta = crypto.randomUUID()) {
        this.fechaAlta = fechaAlta;
        this.fechaHora = fechaHora;
        this.precioBaseEntrada = precioBaseEntrada;
        this.precioCierre = precioCierre;
        this.idSubasta = idSubasta;
    }
}
//# sourceMappingURL=subasta.entity.js.map