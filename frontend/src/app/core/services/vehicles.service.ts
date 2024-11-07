import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vehicle } from '../models/vehicles.interface.js';
import { Brand } from '../models/brands.interfaces.js';
import { Category } from '../models/categories.interface.js';

@Injectable({
  providedIn: 'root'
})
export class VehiclesService {
  private apiUrl = 'http://localhost:3000/api/vehiculos';

  constructor(private http:HttpClient) { }
  addVehicle(formData: FormData): Observable<Vehicle> {
    return this.http.post<Vehicle>(this.apiUrl, formData);
  }
  deleteVehicle(vehicle: Vehicle): Observable<Vehicle> {
    return this.http.delete<Vehicle>(`${this.apiUrl}/${vehicle.id}`);
  }
  editVehicle(vehicle: Vehicle): Observable<Vehicle> {
    return this.http.put<Vehicle>(`${this.apiUrl}/${vehicle.id}`, vehicle);
  }
  getAllVehicle(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(this.apiUrl);
  }

}
