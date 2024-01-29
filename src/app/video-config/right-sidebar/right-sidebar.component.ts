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
  setElementDataForConfig: any;
  constructor(public video: VideoConfigService) {
    video.$selectedElements.subscribe(elem => {
      this.allElements = elem;
    })
    video.setElementDataForConfig.subscribe((data: any) => {
      this.setElementDataForConfig = data;
      this.element = data?.config;
      this.activeTabIndex = 1;
    })
  }

  activeTab(_Index: any) {
    this.activeTabIndex = _Index;
  }

  editElement(_Index: any) {
    let Ele = JSON.parse(JSON.stringify(this.allElements[_Index]));
    this.video.setElementDataForConfig.next(Ele);
    this.activeTabIndex = 1;
  }

  deleteElement(_Index: any) {
    let AllEle = JSON.parse(JSON.stringify(this.allElements));
    AllEle.splice(_Index, 1);
    this.video.$selectedElements.next(AllEle);
    this.video.setElementDataForConfig.next(null);
  }

}
