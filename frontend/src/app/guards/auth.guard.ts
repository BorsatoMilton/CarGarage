import { CanActivateFn } from '@angular/router';
import { AuthService } from '../core/services/auth.service.js';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Verificar si el usuario está autenticado
  if (!authService.isAuthenticated()) {
    router.navigate(['/auth/login']);
    return of(false); // Retornamos `of(false)` porque `authGuard` debe devolver un `Observable<boolean>`
  }

  // Retornar un observable que verifique el rol del usuario
  return authService.getRole().pipe(
    map(rolNombre => {
      if (rolNombre === 'admin') {
        return true; // Permitir la navegación si el rol es 'admin'
      } else {
        console.log(rolNombre)
        alert('Sin permiso');
        router.navigate(['/']); // Redirigir a la página de inicio si no es 'admin'
        return false;
      }
    }),
    catchError(error => {
      console.error('Error al obtener el rol desde el guard:', error);
      router.navigate(['/auth/login']); // En caso de error, redirigir al login
      return of(false);
    })
  );
};
