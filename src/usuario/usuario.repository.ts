import {Repository} from '../shared/repository.js';
import {Usuario} from './usuario.entity.js';

const usuarios = [
    new Usuario('Colo', 'Dayer', 'colitoDayer@gmail.com', 'colito', '1234', 'Regimiento 11'),
    new Usuario('Bochiti', 'Arachi', 'lafuria@gmail.com', 'Chispitas', '4321', 'Regimiento 15'),
    new Usuario('Culon', 'Marchec', 'tuculoncitolindo@yahoo.com', 'Pelon', 'mama', 'Calle sin salida'),
];
export class UsuarioRepository implements Repository<Usuario>{
    public findAll(): Usuario[] | undefined{
        return usuarios
    }
    public findOne(item: {id: string}): Usuario | undefined{
        return usuarios.find(usuario => usuario.idUsuario === item.id)
    }

    public add(item: Usuario): Usuario | undefined{
        usuarios.push(item)
        return item
    }

    public update(item: Usuario): Usuario | undefined{
        const index = usuarios.findIndex((usuario) => usuario.idUsuario === item.idUsuario)
        if(index !== -1){
            usuarios[index] = {...usuarios[index], ...item}
        }
        return usuarios[index]
    }
    public delete(item: { id: string; }): Usuario | undefined {
        const index = usuarios.findIndex(usuario => usuario.idUsuario === item.id)
        if(index !== -1){
            const usuarioBorrado = usuarios[index]
            usuarios.splice(index, 1)
            return usuarioBorrado
        }
    }
}