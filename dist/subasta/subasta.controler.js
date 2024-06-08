import { SubastaRepository } from "./subasta.repository.js";
import { Subasta } from "./subasta.entity.js";
const repository = new SubastaRepository();
function sanitizeUserInput(req, res, next) {
    req.body.sanitizedInput = {
        fechaAlta: req.body.fechaAlta,
        fechaHora: req.body.fechaHora,
        precioBaseEntrada: req.body.precioBaseEntrada,
        precioCierre: req.body.precioCierre,
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
    const subasta = repository.findOne({ id });
    if (!subasta) {
        return res.status(404).json({ message: 'Subasta no encontrada' });
    }
    res.json({ data: subasta });
}
function add(req, res) {
    const input = req.body.sanitizedInput;
    const nuevaSubasta = new Subasta(input.fechaAlta, input.fechaHora, input.precioBaseEntrada, input.precioCierre);
    const subasta = repository.add(nuevaSubasta);
    return res.status(201).json({ message: 'Subasta Creada con exito!', data: subasta });
}
function update(req, res) {
    req.body.sanitizedInput.idSubasta = req.params.id;
    const subasta = repository.update(req.body.sanitizedInput);
    if (!subasta) {
        return res.status(404).json({ message: 'Subasta no encontrada' });
    }
    return res.status(200).json({ message: 'Subasta actualizada con exito!', data: subasta });
}
function remove(req, res) {
    const id = req.params.id;
    const subasta = repository.delete({ id });
    if (!subasta) {
        return res.status(404).json({ message: 'Subasta no encontrada' });
    }
    return res.status(200).json({ message: 'Subasta eliminada con exito!', data: subasta });
}
export { findAll, findOne, add, update, remove, sanitizeUserInput };
//# sourceMappingURL=subasta.controler.js.map