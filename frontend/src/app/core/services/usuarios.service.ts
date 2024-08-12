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

      getUsuarioByEmail(email: string):Observable<Usuario>{
        return this.http.get<Usuario>(`${this.apiUrl}/login/${email}`);
      }
  }

