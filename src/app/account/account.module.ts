import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account.component';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { FormsModule } from '@angular/forms';


const routes: Routes = [
    {
      path:'',
      component: AccountComponent,
      children:[
        { path:'', redirectTo: '/account/login', pathMatch:'full'},
        { path:'login', component: LoginComponent }
      ]
    },
  ]
  

@NgModule({
  declarations: [
    AccountComponent,
    LoginComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule
  ]
})
export class AccountModule { }
