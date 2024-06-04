import { Producto } from './producto.entity.js';
const productos = [
    new Producto('Coca Cola', 'Gaseosa', new Date(), 100, 'imagen', null),
    new Producto('Pepsi', 'Gaseosa', new Date(), 100, 'imagen', null),
    new Producto('Fanta', 'Gaseosa', new Date(), 100, 'imagen', null),
    new Producto('Sprite', 'Gaseosa', new Date(), 100, 'imagen', null),
];
export class ProductoRepository {
    findAll() {
        return productos;
    }
    findOne(item) {
        return productos.find(producto => producto.idProducto === item.id);
    }
    add(item) {
        productos.push(item);
        return item;
    }
    update(item) {
        const index = productos.findIndex((producto) => producto.idProducto === item.idProducto);
        if (index !== -1) {
            productos[index] = { ...productos[index], ...item };
        }
        return productos[index];
    }
    delete(item) {
        const index = productos.findIndex(producto => producto.idProducto === item.id);
        if (index !== -1) {
            const productoBorrado = productos[index];
            productos.splice(index, 1);
            return productoBorrado;
        }
    }
}
//# sourceMappingURL=producto.repository.js.map