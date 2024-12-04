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


      addUser(data: FormData): Observable<User> {
        return this.http.post<User>(this.apiUrl, data);
      }
      deleteUser(user: User): Observable<User> {
        return this.http.delete<User>(`${this.apiUrl}/${user.id}`);
      }
      editUser(user: User): Observable<User> {
        return this.http.put<User>(`${this.apiUrl}/${user.id}`, user);
      }
      getAllUser(): Observable<User[]> {
        return this.http.get<User[]>(this.apiUrl);
      }
  }

