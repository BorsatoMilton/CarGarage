import {Repository} from '../shared/repository.js';
import {Producto} from  './producto.entity.js';

const productos = [
  
  new Producto('Coca Cola', 'Gaseosa', new Date(), 100, 'imagen', null),
  new Producto('Pepsi', 'Gaseosa', new Date(), 100, 'imagen',null),
  new Producto('Fanta', 'Gaseosa', new Date(), 100, 'imagen', null),
  new Producto('Sprite', 'Gaseosa', new Date(), 100, 'imagen', null),
]; 

export class ProductoRepository implements Repository<Producto>{
    public findAll(): Producto[] | undefined{
        return productos
    }
    public findOne(item: {id: string}): Producto | undefined{
        return productos.find(producto => producto.idProducto === item.id)
    }

    public add(item: Producto): Producto | undefined{
        productos.push(item)
        return item
    }

    public update(item: Producto): Producto | undefined{
        const index = productos.findIndex((producto) => producto.idProducto === item.idProducto)
        if(index !== -1){
            productos[index] = {...productos[index], ...item}
        }
        return productos[index]
    }
    public delete(item: { id: string; }): Producto | undefined {
        const index = productos.findIndex(producto => producto.idProducto === item.id)
        if(index !== -1){
            const productoBorrado = productos[index]
            productos.splice(index, 1)
            return productoBorrado
        }
    }
}