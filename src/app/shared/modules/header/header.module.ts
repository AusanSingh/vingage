import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { RouterModule } from '@angular/router';
import { SidebarModule } from '../sidebar/sidebar.module';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';


@NgModule({
  declarations: [
    HeaderComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SidebarModule,
    BsDropdownModule.forRoot()
  ],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule { }
