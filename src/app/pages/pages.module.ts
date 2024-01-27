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
      { path: '', redirectTo: 'video', pathMatch: 'full' },
      {
        path: 'video',
        loadChildren: () => import('./video/video.module').then(m => m.VideoModule),
        data: { page_title: "Video" },
        // canActivate: [AuthGuard]
      }
    ],
  },
  { path: '', redirectTo: 'video', pathMatch: 'full'}
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
