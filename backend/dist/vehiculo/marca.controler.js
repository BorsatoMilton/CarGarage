import { orm } from "../shared/db/orm.js";
import { Marca } from "./marca.entity.js";
const em = orm.em;
function sanitizeModeloInput(req, res, next) {
    req.body.sanitizedInput = {
        nombreMarca: req.body.nombreMarca,
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
        const marcas = await em.find(Marca, {});
        res.status(200).json(marcas);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function findOne(req, res) {
    try {
        const id = req.params.id;
        const marca = await em.findOneOrFail(Marca, { id });
        res.status(200).json({ message: 'Marca Encontrada', data: marca });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function add(req, res) {
    try {
        const marca = em.create(Marca, req.body.sanitizedInput);
        await em.flush();
        res.status(201).json({ message: 'Marca creada', data: marca });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function update(req, res) {
    try {
        const id = req.params.id;
        const marcaAactualizar = await em.findOneOrFail(Marca, { id });
        em.assign(marcaAactualizar, req.body.sanitizedInput);
        await em.flush();
        res.status(200).json({ message: 'Marca actualizada', data: marcaAactualizar });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function remove(req, res) {
    try {
        const id = req.params.id;
        const marcaAeliminar = em.getReference(Marca, id);
        await em.removeAndFlush(marcaAeliminar);
        res.status(200).json({ message: 'Marca eliminada' });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export { findAll, findOne, add, update, remove, sanitizeModeloInput };
//# sourceMappingURL=marca.controler.js.map