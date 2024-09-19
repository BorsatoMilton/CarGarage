import { orm } from "../shared/db/orm.js";
import { Categoria } from "./categoria.entity.js";
const em = orm.em;
function sanitizeModeloInput(req, res, next) {
    req.body.sanitizedInput = {
        nombreCategoria: req.body.nombreCategoria,
        descripcionCategoria: req.body.descripcionCategoria,
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
        const categorias = await em.find(Categoria, {});
        res.status(200).json(categorias);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function findOne(req, res) {
    try {
        const id = req.params.id;
        const categoria = await em.findOneOrFail(Categoria, { id });
        res.status(200).json({ message: 'Categoria Encontrada', data: categoria });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function add(req, res) {
    try {
        const categoria = em.create(Categoria, req.body.sanitizedInput);
        await em.flush();
        res.status(201).json({ message: 'Categoria creada', data: categoria });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function update(req, res) {
    try {
        const id = req.params.id;
        const categoria = await em.findOneOrFail(Categoria, { id });
        em.assign(categoria, req.body.sanitizedInput);
        await em.flush();
        res.status(200).json(categoria);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function remove(req, res) {
    try {
        const id = req.params.id;
        const categoria = em.getReference(Categoria, id);
        await em.removeAndFlush(categoria);
        res.status(200).json({ message: 'Categoria Eliminada' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export { findAll, findOne, add, update, remove, sanitizeModeloInput };
//# sourceMappingURL=categoria.controler.js.map