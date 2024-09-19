import { Tarjeta } from './tarjeta.entity.js';
import { orm } from '../shared/db/orm.js';
const em = orm.em;
function sanitizeTarjetaInput(req, res, next) {
    req.body.sanitizedInput = {
        numeroTarjeta: req.body.numeroTarjeta,
        codSeguridad: req.body.codSeguridad,
        fechaVencimiento: req.body.fechaVencimiento,
        usuario: req.body.usuario,
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
        const tarjetas = await em.find(Tarjeta, {}, { populate: ['usuario'] });
        res.status(200).json({ message: 'Tarjetas', data: tarjetas });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function findOne(req, res) {
    try {
        const id = req.params.id;
        const tarjeta = await em.findOneOrFail(Tarjeta, { id });
        res.status(200).json({ message: 'Tarjeta Encontrada', data: tarjeta });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function add(req, res) {
    try {
        const tarjeta = em.create(Tarjeta, req.body.sanitizedInput);
        await em.flush();
        res.status(201).json({ message: 'Tarjeta creada', data: tarjeta });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function update(req, res) {
    try {
        const id = req.params.id;
        const tarjetaAactualizar = await em.findOneOrFail(Tarjeta, { id });
        em.assign(tarjetaAactualizar, req.body.sanitizedInput);
        await em.flush();
        res
            .status(200)
            .json({ message: 'Tarjeta Actualizada', data: tarjetaAactualizar });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function remove(req, res) {
    try {
        const id = req.params.id;
        const tarjeta = em.getReference(Tarjeta, id);
        await em.removeAndFlush(tarjeta);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export { sanitizeTarjetaInput, findAll, findOne, add, update, remove };
//# sourceMappingURL=tarjeta.controler.js.map