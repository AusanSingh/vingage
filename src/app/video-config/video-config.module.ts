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
import { CompStyleEffectComponent } from './editor/shared/comp-style-effect/comp-style-effect.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { ModalModule } from 'ngx-bootstrap/modal';


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
    CompStyleEffectComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    VideoContModule,
    FormsModule, //for template driven
    ModalModule.forRoot(),
    ColorPickerModule
  ],
  exports: [ColorPickerModule],
  providers: [VideoConfigService]
})
export class VideoConfigModule { }
