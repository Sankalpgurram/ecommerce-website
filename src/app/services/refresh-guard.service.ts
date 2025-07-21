import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RefreshRedirectGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const isRefresh = performance?.navigation?.type === performance?.navigation?.TYPE_RELOAD;
    const isHomeRoute = state.url === '/';

    if (isRefresh && !isHomeRoute) {
      window.location.href = '/';  // Full reload at home
      return false;
    }

    return true;
  }
}
