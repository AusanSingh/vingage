import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VingageComponent } from './vingage.component';
import { RouterModule, Routes } from '@angular/router';
import { MediaPlayerModule } from '../shared/modules/media-player/media-player.module';
import { VideoConfigService } from '../shared/services/video-config.service';

const routes: Routes = [
  { path: '', component: VingageComponent, pathMatch: 'full' },
]


@NgModule({
  declarations: [
    VingageComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MediaPlayerModule
  ],
  providers: [VideoConfigService]
})
export class VingageModule { }
