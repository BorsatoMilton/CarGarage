import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.interface.js';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private apiUrl = 'http://localhost:3000/api/usuarios';
  

  constructor(private http: HttpClient) { }

      getUsuarioByUser(user: string):Observable<User>{
        return this.http.get<User>(`${this.apiUrl}/login/${user}`);
      }

      addUsuario(usuario: User): Observable<User> {
        return this.http.post<User>(this.apiUrl, usuario);
      }
  }

