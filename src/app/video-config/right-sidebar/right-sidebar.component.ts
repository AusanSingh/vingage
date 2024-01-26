import { Component } from '@angular/core';
import { VideoConfigService } from '../services/video-config.service';

@Component({
  selector: 'app-right-sidebar',
  templateUrl: './right-sidebar.component.html',
  styleUrls: ['./right-sidebar.component.scss']
})
export class RightSidebarComponent {
  element: any = null;
  JSON: any;
  constructor(public video: VideoConfigService) {
    video.setElementDataForConfig.subscribe(data => {
      this.element = data;
    })
  }

}
