import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Compra } from '../models/compra.interfaces.js';


@Injectable({
  providedIn: 'root'
})
export class CompraService {
  private apiUrl = 'http://localhost:3000/api/compras';
  
  
  constructor(private http:HttpClient) { }
  addCompra(formData: FormData): Observable<Compra> {
    return this.http.post<Compra>(this.apiUrl, formData);
  }
  getAllCompra(): Observable<Compra[]> {
    return this.http.get<Compra[]>(this.apiUrl);
  }
  
  

}