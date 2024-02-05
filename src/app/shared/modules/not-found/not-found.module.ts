import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found.component';
import { Routes, RouterModule } from '@angular/router';


let route: Routes = [
  { path: '', component: NotFoundComponent, pathMatch: 'full' }
]


@NgModule({
  declarations: [
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(route),

  ]
})
export class NotFoundModule { }
