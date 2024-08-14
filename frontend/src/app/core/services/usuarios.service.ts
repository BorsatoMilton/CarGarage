import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario.interface.js';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private apiUrl = 'http://localhost:3000/api/usuarios';
  

  constructor(private http: HttpClient) { }

      getUsuarioByUser(user: string):Observable<Usuario>{
        return this.http.get<Usuario>(`${this.apiUrl}/login/${user}`);
      }

      addUsuario(usuario: Usuario): Observable<Usuario> {
        return this.http.post<Usuario>(this.apiUrl, usuario);
      }
  }

