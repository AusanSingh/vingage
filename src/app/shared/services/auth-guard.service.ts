import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { take, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ADMIN_PAGES, USER_PAGES } from '../models/global.constant';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  adminPages=ADMIN_PAGES;
  userPages=USER_PAGES;

  constructor(
    private _auth: AuthenticationService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const user = this._auth.$currentUser.value;
    let status = true;
    if(user) {
      return status;
    }
    this.router.navigate(['/account/login']);
    return status;
  }



}
