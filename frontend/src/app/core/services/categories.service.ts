import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/categories.interface.js';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  private apiUrl = 'http://localhost:3000/api/categorias';

  constructor(private http:HttpClient) { }
  addCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(this.apiUrl, category);
  }

  getAllCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.apiUrl);
  }

  deleteCategory(category: Category): Observable<Category> {
    return this.http.delete<Category>(`${this.apiUrl}/${category.id}`);
  }

  editCategory(category: Category): Observable<Category> {
    return this.http.put<Category>(`${this.apiUrl}/${category.id}`, category);
  }
  getOneCategory(id:string): Observable<Category> {
    return this.http.get<Category>(`${this.apiUrl}/${id}`)
  }
}

