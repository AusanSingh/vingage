import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

let routes: Routes = [
  {
    path: 'list',
    component: ListComponent, pathMatch: 'full'
  },
  {
    path: '', pathMatch: 'full', redirectTo: 'list'
  }
]

@NgModule({
  declarations: [
    ListComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    BsDropdownModule.forRoot()
  ]
})
export class TemplateModule { }
