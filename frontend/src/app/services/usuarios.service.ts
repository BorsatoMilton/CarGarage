import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface Usuario {
  id: string;
  usuario: string;
  clave: string;
  nombre: string;
  apellido: string;
  mail: string;
  direccion?: string;
  tarjeta?: string;
  calificacion?: string;
  pedido?: string;
}


interface UsuariosResponse {
  data: Usuario[];
  message: string;
}


@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private apiUrl = 'http://localhost:3000/api/usuarios';
  

  constructor(private http: HttpClient) { }

      getAllUsuarios():Observable<UsuariosResponse>{
        return this.http.get<UsuariosResponse>(this.apiUrl);
      }

      getUsuario(id: string):Observable<UsuariosResponse>{
        return this.http.get<UsuariosResponse>(`${this.apiUrl}/${id}`);
      }

  }

