import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VideoConfigComponent } from './video-config.component';
import { RightSidebarComponent } from './right-sidebar/right-sidebar.component';
import { LeftSidebarComponent } from './left-sidebar/left-sidebar.component';
import { RouterModule, Routes } from '@angular/router';
import { VideoContModule } from './video-cont/video-cont.module';
import { VideoConfigService } from './services/video-config.service';
import { VideoConfigHeaderComponent } from './video-config-header/video-config-header.component';
import { ButtonConfigurationsComponent } from './editor/button-configurations/button-configurations.component';
import { TextConfigurationsComponent } from './editor/text-configurations/text-configurations.component';
import { FormsModule } from '@angular/forms';
import { NumberOnlyDirective } from './directives/number-only.directive';
import { TwoDecimalPointsDirective } from './directives/two-decimal-points.directive';


let route: Routes = [
  { path: '', component: VideoConfigComponent, pathMatch: 'full' }
]

@NgModule({
  declarations: [
    VideoConfigComponent,
    RightSidebarComponent,
    LeftSidebarComponent,
    VideoConfigHeaderComponent,
    TextConfigurationsComponent,
    ButtonConfigurationsComponent,
    NumberOnlyDirective,
    TwoDecimalPointsDirective
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    VideoContModule,
    FormsModule, //for template driven
  ],
  providers: [VideoConfigService]
})
export class VideoConfigModule { }
