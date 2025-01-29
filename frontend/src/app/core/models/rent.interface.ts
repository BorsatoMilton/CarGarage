import { User } from "./user.interface.js";
import { Vehicle } from "./vehicles.interface.js";

export interface Rent{
    id: number;
    fechaAlquiler: Date;
    fechaHoraInicioAlquiler: Date;
    fechaHoraDevolucion: Date;
    estadoAlquiler: String;
    locador: User;
    locatario: User;
    vehiculo: Vehicle;
}