import { User } from './user.interface';

export interface Qualification {
    idCalificacion: string;
    fechaCalificacion: Date;
    valoracion: number;
    usuario: User;
    comentario: string;
}