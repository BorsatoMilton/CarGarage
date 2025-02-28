import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Faq } from '../models/faq.interface.js';

@Injectable({
  providedIn: 'root'
})
export class FaqService {
  apiUrl = 'http://localhost:3000/api/faq';

  constructor(private http: HttpClient) { }

  findAllFaqs(): Observable<Faq[]> {
    return this.http.get<Faq[]>(this.apiUrl);
  }

  addFaq(faq: Faq): Observable<Faq> {
    return this.http.post<Faq>(this.apiUrl, faq);
  }

  updateFaq(faq: Faq): Observable<Faq> {
    return this.http.put<Faq>(`${this.apiUrl}/${faq.id}`, faq);
  }

  deleteFaq(id: number): Observable<Faq> {
    return this.http.delete<Faq>(`${this.apiUrl}/${id}`);
  }

}
