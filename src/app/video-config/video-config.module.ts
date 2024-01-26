import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoConfigComponent } from './video-config.component';
import { RightSidebarComponent } from './right-sidebar/right-sidebar.component';
import { LeftSidebarComponent } from './left-sidebar/left-sidebar.component';
import { RouterModule, Routes } from '@angular/router';
import { VideoContComponent } from './video-cont/video-cont.component';

let route: Routes = [
  {path: '', component: VideoConfigComponent, pathMatch: 'full'}
]

@NgModule({
  declarations: [
    VideoConfigComponent,
    RightSidebarComponent,
    LeftSidebarComponent,
    VideoContComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(route)
  ]
})
export class VideoConfigModule { }
