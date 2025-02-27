import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { User } from '../models/user.interface.js';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/usuarios';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(this.isAuthenticated());
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  private currentUserSubject = new BehaviorSubject<any>(this.getCurrentUser());
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
   }

   login(user: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/login`, { user, password }).pipe(
      map((usuario: User) => {
        this.setUserSession(usuario);
        return usuario;
      })
    );
  }
  
  setUserSession(usuario: User): void {
    sessionStorage.setItem('user', JSON.stringify(usuario));
    this.isAuthenticatedSubject.next(true); 
    this.currentUserSubject.next(usuario); 
  }
  
  logout(): void {
    sessionStorage.removeItem('user');
    this.isAuthenticatedSubject.next(false);
    this.currentUserSubject.next(null); 
    this.router.navigate(['/auth/login']); 
  }
  
  isAuthenticated(): boolean {
    return sessionStorage.getItem('user') !== null;
  }
  
  getCurrentUser(): User | null {
    const userString = sessionStorage.getItem('user');
    return userString ? JSON.parse(userString) : null;
  }
  
}
