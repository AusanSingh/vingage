import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'list', component: ListComponent },
  // { path: 'create', component: CreateUpdateComponent },
  { path: '', redirectTo: 'list', pathMatch: 'full' }
]

@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class CampaignModule { }
