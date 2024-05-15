import { Usuario } from './usuario.entity.js';
const usuarios = [
    new Usuario('Colo', 'Dayer', 'colitoDayer@gmail.com', 'colito', '1234', 'Regimiento 11'),
    new Usuario('Bochiti', 'Arachi', 'lafuria@gmail.com', 'Chispitas', '4321', 'Regimiento 15'),
    new Usuario('Culon', 'Marchec', 'tuculoncitolindo@yahoo.com', 'Pelon', 'mama', 'Calle sin salida'),
];
export class UsuarioRepository {
    findAll() {
        return usuarios;
    }
    findOne(item) {
        return usuarios.find(usuario => usuario.idUsuario === item.id);
    }
    add(item) {
        usuarios.push(item);
        return item;
    }
    update(item) {
        const index = usuarios.findIndex((usuario) => usuario.idUsuario === item.idUsuario);
        if (index !== -1) {
            usuarios[index] = { ...usuarios[index], ...item };
        }
        return usuarios[index];
    }
    delete(item) {
        const index = usuarios.findIndex(usuario => usuario.idUsuario === item.id);
        if (index !== -1) {
            const usuarioBorrado = usuarios[index];
            usuarios.splice(index, 1);
            return usuarioBorrado;
        }
    }
}
//# sourceMappingURL=usuario.repository.js.map