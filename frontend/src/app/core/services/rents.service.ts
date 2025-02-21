import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Rent } from '../models/rent.interface.js';
import { User } from '../models/user.interface.js';
@Injectable({
  providedIn: 'root'
})
export class RentsService {
  private url = 'http://localhost:3000/api/alquiler';

  constructor(private http: HttpClient) { }
  getAllRents(): Observable<Rent[]> {
    return this.http.get<Rent[]>(this.url);
  }

  getRentsByVehicle(id: string): Observable<Rent[]> {
    return this.http.get<Rent[]>(`${this.url}/vehiculo/${id}`);
  }

  getRentsByUser(id: string): Observable<Rent[]> {
    return this.http.get<Rent[]>(`${this.url}/usuario/${id}`);
  }

  getOneRent(id: string): Observable<Rent> {
    return this.http.get<Rent>(`${this.url}/${id}`);
  }

  addRent(rent:Rent): Observable<Rent> {
    return this.http.post<Rent>(this.url, rent);
  }

  confirmRent(idRent: string): Observable<Rent> {
    return this.http.patch<Rent>(`${this.url}/confirmarAlquiler/${idRent}`, {});
  }

  deleteRent(rent: Rent): Observable<Rent> {
    return this.http.delete<Rent>(`${this.url}/${rent.id}`);
  }

  cancelRent(rent: Rent): Observable<Rent> {
    return this.http.put<Rent>(`${this.url}/cancelar/${rent.id}`, rent);
  }

  confirmRentMail(usuario: User,  idAlquiler: string): Observable<Rent> {
    return this.http.post<Rent>(`${this.url}/confirmarAlquilerMail/${idAlquiler}`,  usuario);
  }
}
