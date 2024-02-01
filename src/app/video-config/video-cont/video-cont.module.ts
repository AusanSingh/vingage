import { NgModule } from "@angular/core";
import { VideoContComponent } from "./video-cont.component";
import { CommonModule } from "@angular/common";
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MediaPlayerModule } from "src/app/shared/modules/media-player/media-player.module";

@NgModule({
  declarations: [
    VideoContComponent
  ],
  imports: [
    CommonModule,
    DragDropModule,
    MediaPlayerModule
  ],
  exports: [VideoContComponent]
})
export class VideoContModule { }
