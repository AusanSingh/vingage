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
  allElements: any;
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

  editElement() {

  }

  deleteElement(_Index: any) {
    let AllEle = JSON.parse(JSON.stringify(this.allElements));
    AllEle.splice(_Index, 1);
    this.video.$selectedElements.next(AllEle);
  }

}
