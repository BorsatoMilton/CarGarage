import { Calificacion } from './calificacion.entity.js';
import { orm } from '../shared/db/orm.js';
const em = orm.em;
function sanitizeCalificacionInput(req, res, next) {
    req.body.sanitizedInput = {
        fechaCalificacion: req.body.fechaCalificacion,
        valoracion: req.body.valoracion,
        observacion: req.body.observacion,
        usuario: req.body.usuario,
        producto: req.body.producto,
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
        const calificaciones = await em.find(Calificacion, {});
        res.status(200).json({ message: 'Calificaciones', data: calificaciones });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function findOne(req, res) {
    try {
        const id = req.params.id;
        const calificacion = await em.findOneOrFail(Calificacion, { id });
        res.status(200).json({ message: 'Calificacion Encontrada', data: calificacion });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function add(req, res) {
    try {
        const calificacion = em.create(Calificacion, req.body.sanitizedInput);
        await em.flush();
        res.status(201).json({ message: 'Calificacion creada', data: calificacion });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function update(req, res) {
    try {
        const id = req.params.id;
        const calificacionAactualizar = await em.findOneOrFail(Calificacion, { id });
        em.assign(calificacionAactualizar, req.body.sanitizedInput);
        await em.flush();
        res
            .status(200)
            .json({ message: 'Calificacion Actualizada', data: calificacionAactualizar });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function remove(req, res) {
    try {
        const id = req.params.id;
        const calificacion = em.getReference(Calificacion, id);
        await em.removeAndFlush(calificacion);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export { sanitizeCalificacionInput, findAll, findOne, add, update, remove };
//# sourceMappingURL=calificacion.controler.js.map