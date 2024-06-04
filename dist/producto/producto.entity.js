import crypto from 'node:crypto';
export class Producto {
    constructor(nombre, descripcion, fechaAlta, stock, imagen, // Cambiar el tipo a imagen
    fechaBaja = null, idProducto = crypto.randomUUID()) {
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.fechaAlta = fechaAlta;
        this.stock = stock;
        this.imagen = imagen;
        this.fechaBaja = fechaBaja;
        this.idProducto = idProducto;
    }
}
//# sourceMappingURL=producto.entity.js.map