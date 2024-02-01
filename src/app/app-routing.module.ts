import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', 
    loadChildren: () => import("./pages/pages.module").then(m => m.PagesModule),
  },
  {
    path: 'video-config/:template-id', 
    loadChildren: () => import("./video-config/video-config.module").then(m => m.VideoConfigModule),
  },
  {
    path:'vingage/:template-id',
    loadChildren: () => import("./vingage/vingage.module").then(m => m.VingageModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
