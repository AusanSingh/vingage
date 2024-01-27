import { NgModule } from "@angular/core";
import { VideoContComponent } from "./video-cont.component";
import { CommonModule } from "@angular/common";
import { DragDropModule } from '@angular/cdk/drag-drop';

@NgModule({
  declarations: [
    VideoContComponent
  ],
  imports: [
    CommonModule,
    DragDropModule,
  ],
  exports: [VideoContComponent]
})
export class VideoContModule { }
