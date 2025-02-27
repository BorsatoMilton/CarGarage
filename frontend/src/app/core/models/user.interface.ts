export interface User {
    id: string;
    usuario: string;
    clave: string;
    nombre: string;
    apellido: string;
    mail: string;
    direccion: string;
    telefono: string;
    tarjeta?: string;
    calificacion?: string;
    pedido?: string;
    rol: string
}