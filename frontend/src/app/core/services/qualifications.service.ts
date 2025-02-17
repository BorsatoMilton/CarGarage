import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Qualification } from '../models/qualification.inteface.js';


@Injectable({
  providedIn: 'root'
})
export class QualificationsService {

  constructor(private http: HttpClient) { }

  getQualificationsByUserId(userId: string) {
    return this.http.get<any>(`http://localhost:3000/api/calificaciones/${userId}`);
  }

  createQualification(qualification: Qualification) {
    return this.http.post<any>('http://localhost:3000/api/calificaciones', qualification);
  }

  checkQualificationExists(userId: string, rentId: string) {
    return this.http.get<any>(`http://localhost:3000/api/calificaciones/${userId}/${rentId}`);
  }
}
