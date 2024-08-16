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
}
