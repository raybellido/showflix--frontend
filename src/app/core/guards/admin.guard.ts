import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/authService';

export const adminGuard: CanActivateFn = () => {
 
  const authService = inject(AuthService);
  const router = inject(Router);

  console.log('TOKEN:', authService.getToken());
  console.log('ROLE:', authService.getRole());
  console.log('IS ADMIN:', authService.isAdmin()); 
  
  if (authService.isAdmin()) {
    return true;
  }

  return router.createUrlTree(['/']);
};
