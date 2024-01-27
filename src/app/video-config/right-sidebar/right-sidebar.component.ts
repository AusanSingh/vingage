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
  activeTabIndex = 1;
  allElements = [];
  constructor(public video: VideoConfigService) {
    video.$selectedElements.subscribe(elem => {
      this.allElements = elem;
    })
    video.setElementDataForConfig.subscribe(data => {
      this.element = data;
      this.activeTabIndex = 1;
    })
  }

  activeTab(_Index: any) {
    this.activeTabIndex = _Index;
  }

}
