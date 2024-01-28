import { NgModule } from "@angular/core";
import { VideoContComponent } from "./video-cont.component";
import { CommonModule } from "@angular/common";
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MediaPlayerComponent } from "./media-player/media-player.component";

@NgModule({
  declarations: [
    VideoContComponent,
    MediaPlayerComponent
  ],
  imports: [
    CommonModule,
    DragDropModule,
  ],
  exports: [VideoContComponent]
})
export class VideoContModule { }
