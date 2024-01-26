import { Injectable } from '@angular/core';
import { AuthenticationService } from './authentication.service';
import { HttpHeaders } from "@angular/common/http";
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SharedService {
  $sessionData = new BehaviorSubject({});

  constructor(
    private _authService: AuthenticationService,
  ) { }
    

    getSessionData() {
      return this._authService.getRequest(`/api/session`);
    }

    deleteSessionData() {
      return this._authService.deleteRequest(`/api/session`);
    }
    
    
}
