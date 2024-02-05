import { Component } from '@angular/core';
import { VideoConfigService } from 'src/app/shared/services/video-config.service';

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
    video.$selectedElements.subscribe((elem: any) => {
      this.allElements = elem;
    });

    video.setElementDataForConfig.subscribe((data: any) => {
      this.setElementDataForConfig = data;
      this.element = data?.config;
      this.activeTabIndex = 1;
    });
  }

  activeTab(_Index: number) {
    this.activeTabIndex = _Index;
  }

  editElement(_Index: number) {
    this.video.pauseVideo.next(true);
    let Ele = this.allElements[_Index];
    this.video.setElementDataForConfig.next(Ele);
    this.video.playVideoAtSpecificTime.next(+Ele.config.duration.start);
    this.activeTabIndex = 1;
  }

  deleteElement(index: number): void {
    this.video.pauseVideo.next(true);
    const allElementsCopy: any = JSON.parse(JSON.stringify(this.allElements));
    allElementsCopy.splice(index, 1);
    this.video.$selectedElements.next(allElementsCopy);
    this.video.setElementDataForConfig.next(null);
  }
}
