import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot,RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthenticationService } from './authentication.service';
 
@Injectable()
export class RequiredAPIResolveService implements Resolve<any>{
 
    constructor(private _router:Router , private _auth:AuthenticationService ) {
    }
 
    resolve(route: ActivatedRouteSnapshot,
            state: RouterStateSnapshot): Observable<any> {
                return this._auth.getRequiredConfigBeforeAccess();
    }
}
