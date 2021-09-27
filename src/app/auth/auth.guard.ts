import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
      private authenticationService: AuthenticationService,
      private router: Router) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const authenticated = this.authenticationService.isAuthenticated();

    if (next?.url[0]?.path === 'login' && authenticated) {
        this.router.navigate(['']);
    }

    if (next?.url[0]?.path !== 'login' && !authenticated) {
        this.router.navigate(['/login']);
    }

    return true;
  }
}
