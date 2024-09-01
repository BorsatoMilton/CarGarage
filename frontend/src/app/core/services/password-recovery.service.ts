import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {RecoveryPassword} from '../models/recovery-password';

@Injectable({
  providedIn: 'root'
})
export class PasswordRecoveryService {

  private apiUrl = 'http://localhost:3000/api/recuperacion'; 

  constructor(private http: HttpClient) { }

  sendRecoveryEmail(email: string): Observable<any> {
    const correo: RecoveryPassword = {
      asunto: 'Recuperación de contraseña',
      destinatario: email,
      mensaje: 'Para recuperar tu contraseña, haz clic en el siguiente enlace: '}
    return this.http.post<any>(this.apiUrl, correo);
  }
}
