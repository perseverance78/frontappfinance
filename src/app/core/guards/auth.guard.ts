import { inject } from '@angular/core';
import { Router, type CanActivateFn } from '@angular/router';
import { AuthService } from '../../features/auth/services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isAuthenticated()) {
    return true; // Permite el acceso si está autenticado
  } else {
    router.navigate(['/auth/login']); // Redirige a la página de autenticación si no está autenticado
    return false;
  }
  
  
};
