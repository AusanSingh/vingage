import { Component, TemplateRef } from '@angular/core';
import { VideoConfigService } from 'src/app/shared/services/video-config.service';

@Component({
  selector: 'app-video-config-header',
  templateUrl: './video-config-header.component.html',
  styleUrls: ['./video-config-header.component.scss']
})
export class VideoConfigHeaderComponent {
  allElements: any;

  constructor(public video: VideoConfigService) {
    this.allElements = []
    video.$selectedElements.subscribe(elem => {
      this.allElements = elem;
    })
  }

  sendData() {
    console.log(this.allElements);
  }

}
