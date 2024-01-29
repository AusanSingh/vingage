import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, map, Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  BASE_URL = environment.SITE_URL;
  private userAccessToken: BehaviorSubject<any>;
  public httpOptions: any;
  $currentUser: BehaviorSubject<any> = new BehaviorSubject({});
  $metaData = new BehaviorSubject({});

  constructor(
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) { 
    this.userAccessToken = new BehaviorSubject(localStorage.getItem('accessToken') || '');
    this.currentUserDetailsFromLocalStorage();
  }

  public get getUserAccessToken() {
    return this.userAccessToken.value;
  }

  public get getAccessToken() {
    return this.getUserAccessToken ? this.getUserAccessToken : "";
  }

  // Post request
  postRequest(api_url: any, data: any, httpOptions:any = this.http_option): Observable<any> {
    const url = `${this.BASE_URL}${api_url}`;
    // const url = `${api_url}`;
    return this.http.post(url, data, httpOptions);
  }

  // Put request
  putRequest(api_url: any, data: any, httpOptions:any = this.http_option): Observable<any> {
    const url = `${this.BASE_URL}${api_url}`;
    return this.http.put(url, data, httpOptions);
  }

  // Patch request
  patchRequest(api_url: any, data: any, httpOptions:any = this.http_option): Observable<any> {
    const url = `${this.BASE_URL}${api_url}`;
    return this.http.patch(url, data, httpOptions);
  }

  deleteRequest(api_url: any, httpOptions:any = this.http_option): Observable<any> {
    const url = `${this.BASE_URL}${api_url}`;
    return this.http.delete(url, httpOptions);  
  }

  public getRequest(api_url: string,httpOptions:any = this.http_option): Observable<any> {
    // console.log(api_url)
    const url = `${this.BASE_URL}${api_url}`;
    // console.log(url);
    return this.http.get(url,httpOptions);
  }

  debounce(func: Function, delay: number) {
    let timeoutId: any;
  
    return (...args: any[]) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  currentUserDetailsFromLocalStorage(){
    let _token = localStorage.getItem("accessToken");
    let _user: any = localStorage.getItem("userInfo");
    this.$currentUser.next(JSON.parse(_user));

    if(!_token) return;
    this.userAccessToken.next(_token);
  }

  clearLocalStorageGoToLogin(){
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userInfo");
    this.userAccessToken.next(null);
    this.router.navigate(["/account/login"]);
  }

  get http_option() {
    this.httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        'vingage-x': `secret-token`,
      }),
    };
    return this.httpOptions;
  }

  get http_media_option() {
    this.httpOptions = {
      headers: new HttpHeaders({
        'x-ms-blob-type': 'BlockBlob'
      }),
    };
    return this.httpOptions;
  }


  logout() {
    if (!this.getAccessToken) return;
    this.clearLocalStorageGoToLogin();
  }

  getRequiredConfigBeforeAccess() {
    console.log(this.getAccessToken)
    return forkJoin([
      this.getRequest(`/api/metadata`),
    ]
    )
    .pipe(
      map((res) => {
        let meta: any = res[0];
        this.$metaData.next(meta);
        return res;
      })
    )
  }

}
