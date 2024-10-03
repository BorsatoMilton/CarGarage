import { Brand } from "./brands.interfaces";
import { Category } from "./categories.interface";

export interface Vehicle {
    id: string;
    nombre: string;
    descripcion: string;
    fechaAlta?: Date;
    fechaBaja?: Date;
    precioVenta?: number;
    precioAlquilerDiario?: number;
    kilometros:number;
    modelo: string;
    marca: string;
    categoria: string;
    imagenes: string[];
    propietario?: string;
    transmision?: string;
}