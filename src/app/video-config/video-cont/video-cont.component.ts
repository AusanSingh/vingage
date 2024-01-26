import { Component } from '@angular/core';
import { VideoConfigService } from '../services/video-config.service';



@Component({
  selector: 'app-video-cont',
  templateUrl: './video-cont.component.html',
  styleUrls: ['./video-cont.component.scss']
})
export class VideoContComponent {
  elements = [];
  constructor(private video: VideoConfigService) {
    this.video.$selectedElements.subscribe(elem => {
      this.elements = elem
    })
  }


}

