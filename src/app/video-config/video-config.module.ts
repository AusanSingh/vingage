import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoConfigComponent } from './video-config.component';
import { RightSidebarComponent } from './right-sidebar/right-sidebar.component';
import { LeftSidebarComponent } from './left-sidebar/left-sidebar.component';
import { RouterModule, Routes } from '@angular/router';
import { VideoContModule } from './video-cont/video-cont.module';
import { VideoConfigService } from './services/video-config.service';
import { DragDropModule } from '@angular/cdk/drag-drop';


let route: Routes = [
  { path: '', component: VideoConfigComponent, pathMatch: 'full' }
]

@NgModule({
  declarations: [
    VideoConfigComponent,
    RightSidebarComponent,
    LeftSidebarComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    VideoContModule
  ],
  providers: [VideoConfigService]
})
export class VideoConfigModule { }
