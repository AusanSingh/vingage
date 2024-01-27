import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoConfigComponent } from './video-config.component';
import { RightSidebarComponent } from './right-sidebar/right-sidebar.component';
import { LeftSidebarComponent } from './left-sidebar/left-sidebar.component';
import { RouterModule, Routes } from '@angular/router';
import { VideoContModule } from './video-cont/video-cont.module';
import { VideoConfigService } from './services/video-config.service';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { VideoConfigHeaderComponent } from './video-config-header/video-config-header.component';


let route: Routes = [
  { path: '', component: VideoConfigComponent, pathMatch: 'full' }
]

@NgModule({
  declarations: [
    VideoConfigComponent,
    RightSidebarComponent,
    LeftSidebarComponent,
    VideoConfigHeaderComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    VideoContModule
  ],
  providers: [VideoConfigService]
})
export class VideoConfigModule { }
