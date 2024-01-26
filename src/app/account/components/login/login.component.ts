import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from 'src/app/shared/services/account.service';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  isLoading:boolean = false;
  platform:string = 'Surbo';
  constructor(
    private account: AccountService,
    private auth: AuthenticationService,
    private toastr: ToastrService,
    private router: Router
  ) { 
  }

  getUserInfo() {
    this.auth.getRequest(`/api/users/me`).subscribe({
      next: (res) => {
        this.auth.$currentUser.next(res);
        localStorage.setItem('userInfo', JSON.stringify(res));
        this.auth.currentUserDetailsFromLocalStorage();
        this.router.navigateByUrl('/video/all');
      },
      error: () => {
        this.toastr.error('Something went wrong while getting user Info');
      }
    })
  }

  onSubmit(isValid:any){
    
    const formData = new FormData();
    formData.append('grant_type', '');
    formData.append('username', this.username);
    formData.append('password', this.password);
    formData.append('scope', '');
    formData.append('platform', this.platform);
    formData.append('client_id', '');
    formData.append('client_secret', '');
    
    this.account.onLogin(formData)
    .subscribe({
      next: (res:any) => {
        if(res){
          localStorage.setItem('accessToken', res.access_token);
          this.auth.currentUserDetailsFromLocalStorage();
          this.getUserInfo();
        }
      },
      error: (error:any) => {
        this.isLoading=false;
        if(error.error.detail)
          this.toastr.error(error.error.detail)
        else
          this.toastr.error("Something went wrong!")
      }
    });
  }
}
