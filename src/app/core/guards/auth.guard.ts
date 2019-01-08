import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

import { AuthenticationService } from '../services'
import { take } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot
  ): Observable<boolean> {
    return this.authenticationService.isAuthenticated.pipe(take(1));
    // if (localStorage.getItem('currentToken')) {
    //   console.log('AuthGuard: true');
    //   return true;
    // }

    // console.log('AuthGuard: false');
    // this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
    // return false;
  }
}