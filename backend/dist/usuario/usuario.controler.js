import { Usuario } from './usuario.entity.js';
import { orm } from '../shared/db/orm.js';
import { PasswordResetToken } from './passwordResetToken.entity.js';
const em = orm.em;
function sanitizeUsuarioInput(req, res, next) {
    req.body.sanitizedInput = {
        usuario: req.body.usuario,
        clave: req.body.clave,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        mail: req.body.mail,
        direccion: req.body.direccion,
        tarjeta: req.body.tarjeta,
        calificacion: req.body.calificacion,
        alquiler: req.body.alquiler,
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
        const usuarios = await em.find(Usuario, {});
        res.status(200).json({ message: 'Usuarios', data: usuarios });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function findOneById(req, res) {
    try {
        const id = req.params.id;
        const usuario = await em.findOneOrFail(Usuario, { id });
        res.status(200).json({ message: 'Usuario Encontrado', data: usuario });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function findOneByEmail(email) {
    const usuario = await em.findOne(Usuario, { mail: email });
    return usuario;
}
async function findOneByUser(req, res) {
    try {
        const user = req.params.user;
        const usuario = await em.findOne(Usuario, { usuario: user });
        res.status(200).json(usuario);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function add(req, res) {
    try {
        const usuario = em.create(Usuario, req.body.sanitizedInput);
        await em.flush();
        res.status(201).json({ message: 'Usuario creado', data: usuario });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function update(req, res) {
    try {
        const id = req.params.id;
        const usuarioAactualizar = await em.findOneOrFail(Usuario, { id });
        em.assign(usuarioAactualizar, req.body.sanitizedInput);
        await em.flush();
        res
            .status(200)
            .json({ message: 'Usuario Actualizado', data: usuarioAactualizar });
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
async function resetPassword(req, res) {
    const { token, newPassword } = req.body;
    const tokenEntity = await orm.em.findOne(PasswordResetToken, { token });
    if (!tokenEntity || tokenEntity.expiryDate < new Date()) {
        return res.status(400).json({ ok: false, message: 'Token inválido o expirado' });
    }
    const user = await orm.em.findOne(Usuario, tokenEntity.user.id);
    if (!user) {
        return res.status(404).json({ ok: false, message: 'Usuario no encontrado' });
    }
    user.clave = newPassword;
    await orm.em.persistAndFlush(user); //faltaria encriptar la clave, pero bue, pincho
    await orm.em.removeAndFlush(tokenEntity);
    return res.status(200).json({ ok: true, message: 'Contraseña actualizada exitosamente' });
}
async function remove(req, res) {
    try {
        const id = req.params.id;
        const usuario = em.getReference(Usuario, id);
        await em.removeAndFlush(usuario);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
}
export { sanitizeUsuarioInput, findAll, findOneById, findOneByEmail, findOneByUser, resetPassword, add, update, remove };
//# sourceMappingURL=usuario.controler.js.map