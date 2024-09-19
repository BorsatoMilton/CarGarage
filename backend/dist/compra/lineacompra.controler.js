import { orm } from "../shared/db/orm.js";
import { LineaCompra } from "./lineacompra.entity.js";
const em = orm.em;
function sanitizeLineaCompraInput(req, res, next) {
    req.body.sanitizedInput = {
        cantidad: req.body.cantidad,
        precio: req.body.precio,
        producto: req.body.producto,
        pedido: req.body.pedido
    };
    Object.keys(req.body.sanitizedInput).forEach((key) => {
        if (req.body.sanitizedInput[key] === undefined) {
            delete req.body.sanitizedInput[key];
        }
    });
    next();
}
async function findAll(req, res) {
    try {
        const lineas = await em.find(LineaCompra, {});
        res.status(200).json({ message: 'Lineas', data: lineas });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function findOne(req, res) {
    try {
        const id = req.params.id;
        const linea = await em.findOneOrFail(LineaCompra, { id });
        res.status(200).json({ message: 'Linea Encontrada', data: linea });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function add(req, res) {
    try {
        const linea = em.create(LineaCompra, req.body);
        await em.flush();
        res.status(201).json({ message: 'Linea creada', data: linea });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function update(req, res) {
    try {
        const id = req.params.id;
        const linea = await em.findOneOrFail(LineaCompra, { id });
        em.assign(linea, req.body);
        await em.flush();
        res.status(200).json({ message: 'Linea actualizada', data: linea });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function remove(req, res) {
    try {
        const id = req.params.id;
        const linea = em.getReference(LineaCompra, id);
        await em.removeAndFlush(linea);
        res.status(200).json({ message: 'Linea eliminada', data: linea });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export { findAll, findOne, add, update, remove, sanitizeLineaCompraInput };
//# sourceMappingURL=lineacompra.controler.js.map