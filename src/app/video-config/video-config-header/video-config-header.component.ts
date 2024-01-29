import { Component, TemplateRef } from '@angular/core';
import { VideoConfigService } from '../services/video-config.service';

@Component({
  selector: 'app-video-config-header',
  templateUrl: './video-config-header.component.html',
  styleUrls: ['./video-config-header.component.scss']
})
export class VideoConfigHeaderComponent {
  allElements: any;

  constructor(public video: VideoConfigService) {
    video.$selectedElements.subscribe(elem => {
      this.allElements = elem;
    })
  }

  sendData() {
    console.log(this.allElements);
  }

}
