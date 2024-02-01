import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediaPlayerComponent } from './media-player.component';
import { DragDropModule } from '@angular/cdk/drag-drop';



@NgModule({
  declarations: [
    MediaPlayerComponent
  ],
  imports: [
    CommonModule,
    DragDropModule
  ],
  exports: [
    MediaPlayerComponent
  ]
})
export class MediaPlayerModule { }
