import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule,Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { HeaderModule } from '../shared/modules/header/header.module';
import { SidebarModule } from '../shared/modules/sidebar/sidebar.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from '../shared/services/auth-guard.service';


const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      { path: '', redirectTo: 'template', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
        data: { page_title: "Dashboard" },
        // canActivate: [AuthGuard]
      },
      {
        path: 'template',
        loadChildren: () => import('./template/template.module').then(m => m.TemplateModule),
        data: { page_title: "Template" },
        // canActivate: [AuthGuard]
      },
      {
        path: 'campaign',
        loadChildren: () => import('./campaign/campaign.module').then(m => m.CampaignModule),
        data: { page_title: "Campaign" },
        // canActivate: [AuthGuard]
      }
    ],
  },
  { path: '', redirectTo: 'dashbaord', pathMatch: 'full'}
]   


@NgModule({
  declarations: [
    PagesComponent
  ],
  imports: [
    CommonModule,
    HeaderModule,
    SidebarModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ]
})
export class PagesModule { }
