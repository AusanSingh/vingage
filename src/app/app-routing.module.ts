import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import("./pages/pages.module").then(m => m.PagesModule),
  },
  {
    path: 'account',
    loadChildren: () => import("./account/account.module").then(m => m.AccountModule),
  },
  {
    path: 'video-config/:template-id',
    loadChildren: () => import("./video-config/video-config.module").then(m => m.VideoConfigModule),
  },
  {
    path: 'vingage/:template-id',
    loadChildren: () => import("./vingage/vingage.module").then(m => m.VingageModule)
  },
  {
    path: 'not-found',
    loadChildren: () => import("./shared/modules/not-found/not-found.module").then(m => m.NotFoundModule)
  },
  { path: "**", redirectTo: "not-found" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
