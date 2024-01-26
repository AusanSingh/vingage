import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateAndUpdateComponent } from './create-and-update/create-and-update.component';
import { ListComponent } from './list/list.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RemoveUnderscorePipe } from 'src/app/shared/pipes/string.pipes';

let routes:Routes = [
  {
    path:'create',
    component: CreateAndUpdateComponent, pathMatch: 'full'
  },
  {
    path:':video-id/setting',
    component: CreateAndUpdateComponent, pathMatch: 'full'
  },
  {
    path:'list',
    component: ListComponent, pathMatch: 'full'
  },
  {
    path:'', pathMatch: 'full', redirectTo: 'list'
  }
]

@NgModule({
  declarations: [
    CreateAndUpdateComponent,
    ListComponent,
    RemoveUnderscorePipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class VideoModule { }
