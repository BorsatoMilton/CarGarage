import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rol } from '../models/rol.interface';

@Injectable({
  providedIn: 'root'
})
export class RolService {
  private apiUrlName = 'http://localhost:3000/api/rol/byname';
  private apiUrl= 'http://localhost:3000/api/rol';
  constructor(private http: HttpClient) { }

  getOneRolByName(name:string): Observable<Rol> {
    return this.http.get<Rol>(`${this.apiUrlName}/${name}`);
  }

  getOneRol(id: string): Observable<Rol> {
    return this.http.get<Rol>(`${this.apiUrl}/${id}`);
  }
  addRol(rolData: Rol): Observable<Rol> {
    return this.http.post<Rol>(this.apiUrl, rolData);
  }
  deleteRol(rol: Rol): Observable<Rol> {
    return this.http.delete<Rol>(`${this.apiUrl}/${rol.id}`);
  }
  editRol(rol: Rol): Observable<Rol> {
    return this.http.put<Rol>(`${this.apiUrl}/${rol.id}`, rol);
  }
  getAllRol(): Observable<Rol[]> {
    return this.http.get<Rol[]>(this.apiUrl);
  }
}

