import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {RecoveryPassword} from '../models/recovery-password';

@Injectable({
  providedIn: 'root'
})
export class PasswordRecoveryService {

  private apiUrl = 'http://localhost:3000/api/recuperacion'; 
  private apiUrlToReset = 'http://localhost:3000/api/usuarios'

  constructor(private http: HttpClient) { }

  sendRecoveryEmail(email: string): Observable<any> {

    return this.http.post<any>(this.apiUrl, {destinatario: email});
  }

  resetPassword(token: string, newPassword: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrlToReset}/reset`, { token, newPassword });
  }
}
