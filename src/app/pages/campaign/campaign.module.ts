import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { RouterModule, Routes } from '@angular/router';
import { CreateCampaignComponent } from './create-campaign/create-campaign.component';

const routes: Routes = [
  { path: 'list', component: ListComponent },
  { path: 'create-campaign', component: CreateCampaignComponent, pathMatch: "full" },
  { path: '', redirectTo: 'list', pathMatch: 'full' }
]

@NgModule({
  declarations: [
    ListComponent,
    CreateCampaignComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class CampaignModule { }
