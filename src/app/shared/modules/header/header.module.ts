import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { RouterModule } from '@angular/router';
import { SidebarModule } from '../sidebar/sidebar.module';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CreateAndUpdateComponent } from './create-and-update/create-and-update.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HeaderComponent,
    CreateAndUpdateComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SidebarModule,
    ReactiveFormsModule,
    BsDropdownModule.forRoot()
  ],
  exports: [
    HeaderComponent
  ]
})
export class HeaderModule { }
