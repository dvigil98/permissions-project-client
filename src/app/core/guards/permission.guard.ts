import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

export const PermissionGuard = (permission: any) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.hasPermission(permission.data.permission)) {

    router.navigate(['/admin/dashboard']);

    return false;
  }

  return true;
}
