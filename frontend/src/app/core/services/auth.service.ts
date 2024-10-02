import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { User } from '../models/user.interface.js';
import { Router } from '@angular/router';
import { RolService } from './rol.service.js';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/usuarios';
  private isLoggedIn: boolean = false;
  private currentUser: User | null = null;


  constructor(private http: HttpClient, private router: Router, private rolService: RolService) {

    

   }

  login(user: string, password: string):Observable<User>{
    return this.http.post<User>(`${this.apiUrl}/login`, {user, password});
  }


  setUserSession(usuario: User) {
    this.isLoggedIn = true;
    this.currentUser = usuario;
    sessionStorage.setItem('user', JSON.stringify(usuario));
  }

  logout(): void {
    this.isLoggedIn = false;
    this.currentUser = null;
    sessionStorage.removeItem('user');
    this.router.navigate(['/auth/login']); // Redirige al login, no se si dejarlo asi o mandarlo a la pagina principal
  }

  isAuthenticated(): boolean {
    return this.isLoggedIn || sessionStorage.getItem('user') !== null;  // Tiene sentido esto?
  }


  getRole(): Observable<string | null> {
    const user = this.getCurrentUser();
    if (!user) {
      return of(null); 
    }
  
    const rolId = user.rol;
    return this.rolService.getOneRol(rolId).pipe(
      map((rolEntity: any) => rolEntity?.nombreRol || null),
      catchError((error: any) => {
        console.error('Error al obtener el rol:', error);
        return of(null);
      })
    );
  }

  getCurrentUser(): User | null {
    if (!this.currentUser) {
      const userString = sessionStorage.getItem('user');
      this.currentUser = userString ? JSON.parse(userString) : null;
    }
    return this.currentUser;
  }
}
