import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  Router,
  UrlTree
} from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean | UrlTree {
    const expected: string[] = route.data['expectedRoles'] as string[];
    const role = this.auth.getUserRole();
    if (role && expected.includes(role)) {
      return true;
    }
    // Redirige al home o a “sin permisos”
    return this.router.parseUrl('/');
  }
}