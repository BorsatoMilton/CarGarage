import { ProductoRepository } from "./producto.repository.js";
import { Producto } from "./producto.entity.js";
const repository = new ProductoRepository();
function sanitizeUserInput(req, res, next) {
    req.body.sanitizedInput = {
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        fechaAlta: req.body.fechaAlta,
        stock: req.body.stock,
        imagen: req.body.imagen,
        fechaBaja: req.body.fechaBaja
    };
    Object.keys(req.body.sanitizedInput).forEach(key => {
        if (req.body.sanitizedInput[key] === undefined) {
            delete req.body.sanitizedInput[key];
        }
    });
    next();
}
function findAll(req, res) {
    res.json({ data: repository.findAll() });
}
function findOne(req, res) {
    const id = req.params.id;
    const producto = repository.findOne({ id });
    if (!producto) {
        return res.status(404).json({ message: 'Producto no encontrado' });
    }
    res.json({ data: producto });
}
function add(req, res) {
    const input = req.body.sanitizedInput;
    const nuevoProducto = new Producto(input.nombre, input.descripcion, input.fechaAlta, input.stock, input.imagen, input.fechaBaja);
    const producto = repository.add(nuevoProducto);
    return res.status(201).json({ message: 'Producto Creado con exito!', data: producto });
}
function update(req, res) {
    req.body.sanitizedInput.idProducto = req.params.id;
    const producto = repository.update(req.body.sanitizedInput);
    if (!producto) {
        return res.status(404).json({ message: 'Producto no encontrado' });
    }
    return res.status(200).json({ message: 'Producto actualizado con exito!', data: producto });
}
function remove(req, res) {
    const id = req.params.id;
    const producto = repository.delete({ id });
    if (!producto) {
        return res.status(404).json({ message: 'Producto no encontrado' });
    }
    else {
        return res.status(200).json({ message: 'Producto eliminado con exito!', data: producto });
    }
}
export { sanitizeUserInput, findAll, findOne, add, update, remove };
//# sourceMappingURL=producto.controler.js.map