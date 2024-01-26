import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { LoginModel } from 'src/app/shared/models/account.model';

const httpOptions = {
  headers: new HttpHeaders({
    // 'Content-Type': 'application/json',
    // 'accept': 'application/json'
    // accept: 'application/json',
    // 'Content-Type': 'form/data'
  })
}

@Injectable({
  providedIn: 'any'
})
export class AccountService {

  hostUrl: string;
  constructor(private http: HttpClient) { 
    this.hostUrl = environment["SITE_URL"];
  }

  onLogin(login_details:any){
    return this.http.post<LoginModel>(`${this.hostUrl}/api/auth/jwt/login`, login_details, httpOptions);
  }

}
