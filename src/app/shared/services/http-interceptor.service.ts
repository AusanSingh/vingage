import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class HttpInterceptorService implements HttpInterceptor {
  constructor(
    private _auth: AuthenticationService,
    private _toastr: ToastrService,
    private _route: Router
  ) { }

  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    //handle your auth error or rethrow
    if (err instanceof HttpErrorResponse) {
      console.log(err)
      if (err.status === 401 || err.status === 403) {
        //navigate /delete cookies or whatever
        this._toastr.error("User session expired.")
        this._auth.logout();
      } else if (err.status === 500) {
        this._toastr.error("500 Internal server error");
      } else if (err.status === 0) {
        this._toastr.error(err.message || "Status 0: Error");
        console.log(this._auth.getAccessToken);
        if(this._auth.getAccessToken) {
          this._route.navigateByUrl('/error/internal-server')
        } else {
          this._route.navigateByUrl('/account/login')
        }

      } else if (err.error) {
        if(Array.isArray(err.error.detail)) {
          err.error.detail.forEach(
            (elem: any) => {
              this._toastr.error(elem.msg);
            }
          )
        } else if(err.error.message){this._toastr.error(err.error.message) } 
        else if (err.error.detail) this._toastr.error(err.error.detail.errorDesc || err.error.detail);
      } else if (err.status !== 400) {
        if (err.message) this._toastr.error(err.message);
      }
    }
    return throwError(err);
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // let currentUserToken = this._auth.getAccessToken();


   
    request = request.clone({
      withCredentials: false
    });
    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
        }
        return event;
      }),
      catchError(x => this.handleAuthError(x)));
  }
}
