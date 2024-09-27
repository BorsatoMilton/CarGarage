import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Brand } from '../models/brands.interfaces.js';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {
  private apiUrl = 'http://localhost:3000/api/marcas';

  constructor(private http:HttpClient) { }
  addBrand(brand: Brand): Observable<Brand> {
    return this.http.post<Brand>(this.apiUrl, brand);
  }
  deleteBrand(brand: Brand): Observable<Brand> {
    return this.http.delete<Brand>(`${this.apiUrl}/${brand.id}`);
  }
  editBrand(brand: Brand): Observable<Brand> {
    return this.http.put<Brand>(`${this.apiUrl}/${brand.id}`, brand);
  }
  getAllBrand(): Observable<Brand[]> {
    return this.http.get<Brand[]>(this.apiUrl);
  }
  getOneBrand(id:string): Observable<Brand> {
    return this.http.get<Brand>(`${this.apiUrl}/${id}`)
  }
}
