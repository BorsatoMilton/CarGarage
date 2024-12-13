import { User } from "./user.interface.js";
import { Vehicle } from "./vehicles.interface.js";

export interface Compra {
    idCompra : string;
    vehiculo: Vehicle;
    comprador: User;
    fechaCompra: Date;
    fechaCancelacion: Date;
 
}