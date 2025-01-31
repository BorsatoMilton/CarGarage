import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Rent } from '../models/rent.interface.js';
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

  getOneRent(id: string): Observable<Rent> {
    return this.http.get<Rent>(`${this.url}/${id}`);
  }

  addRent(rent:Rent): Observable<Rent> {
    return this.http.post<Rent>(this.url, rent);
  }
  editRent(rent: Rent): Observable<Rent> {
    return this.http.put<Rent>(`${this.url}/${rent.id}`, rent);
  }

  deleteRent(rent: Rent): Observable<Rent> {
    return this.http.delete<Rent>(`${this.url}/${rent.id}`);
  }

  confirmRent(mail:String, idAlquiler: number): Observable<Rent> {
    return this.http.post<Rent>(`${this.url}/confirmarAlquiler`, {id: idAlquiler, destinatario: mail});
  }
}
