import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Compra } from '../models/compra.interfaces.js';
import { User } from '../models/user.interface.js';


@Injectable({
  providedIn: 'root'
})
export class CompraService {
  private apiUrl = 'http://localhost:3000/api/compras';
  
  
  
  constructor(private http:HttpClient) { }
  addCompra(idComprador: string, idVehiculo: string): Observable<Compra> {
    return this.http.post<Compra>(this.apiUrl, {vehiculo: idVehiculo, comprador: idComprador, fechaCancelacion: null});
  }
  
  getAllCompra(): Observable<Compra[]> {
    return this.http.get<Compra[]>(this.apiUrl);
  }

  getAllCompraByUser(userId: string): Observable<Compra[]> {
    return this.http.get<Compra[]>(`${this.apiUrl}/byuser/${userId}`);
  }

  confirmarCompra(mail:string, id: string): Observable<Compra> {
    return this.http.post<Compra>(`${this.apiUrl}/confirmarCompra`, {id: id, destinatario: mail});
  }

  avisoCompraExitosa(mail:string): Observable<Compra> {
    return this.http.post<Compra>(`${this.apiUrl}/avisoCompraExitosa`, { destinatario: mail});
  }

  cancelarCompra(compra: Compra): Observable<Compra> {
    console.log('Compra a cancelar:', compra);
    return this.http.delete<Compra>(`${this.apiUrl}/cancelarCompra`, { body: compra });
  }

}