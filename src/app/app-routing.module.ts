import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '', 
    loadChildren: () => import("./pages/pages.module").then(m => m.PagesModule),
  },
  {
    path: 'video-config/:video-id', 
    loadChildren: () => import("./video-config/video-config.module").then(m => m.VideoConfigModule),
  }
  // {
  //   path:'account',
  //   loadChildren: () => import("./account/account.module").then(m => m.AccountModule)
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
