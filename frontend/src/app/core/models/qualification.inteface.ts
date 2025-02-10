import { User } from './user.interface';
import { Rent } from './rent.interface';

export interface Qualification {
    idCalificacion: string;
    fechaCalificacion: Date;
    valoracion: number;
    usuario: User;
    alquiler: Rent;
    comentario: string;
}