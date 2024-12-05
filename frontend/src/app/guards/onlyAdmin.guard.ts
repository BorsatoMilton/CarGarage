import { CanActivateFn } from '@angular/router';
import { AuthService } from '../core/services/auth.service.js';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

export const onlyAdmin: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);


  if (!authService.isAuthenticated()) {
    router.navigate(['/auth/login']);
    return of(false); 
  }

  return authService.getRole().pipe(
    map(rolNombre => {
      if (rolNombre === 'ADMIN') {
        return true; 
      } else {
        console.log(rolNombre)
        alert('Sin permiso');
        router.navigate(['/']);
        return false;
      }
    }),
    catchError(error => {
      console.error('Error al obtener el rol desde el guard:', error);
      router.navigate(['/auth/login']); 
      return of(false);
    })
  );
};
