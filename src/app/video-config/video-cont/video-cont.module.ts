import { NgModule } from "@angular/core";
import { VideoContComponent } from "./video-cont.component";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations: [
      VideoContComponent
    ],
    imports: [
      CommonModule
    ],
    exports:[VideoContComponent]
  })
  export class VideoContModule { }
