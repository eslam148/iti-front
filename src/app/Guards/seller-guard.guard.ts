import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SellerGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (
      localStorage.getItem('token') &&
      localStorage.getItem('isLoggedIn') == 'true' &&
      localStorage.getItem('Role') == 'Seller'
    ) {
      return true;
    } else {
       this.router.navigate(['/login'], {
         queryParams: { returnUrl: state.url },
       });
      return false;
    }
  }
}
