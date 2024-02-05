import { Component } from '@angular/core';
import { MENU_LIST } from '../services/constant-data';
import { VideoConfigService } from 'src/app/shared/services/video-config.service';


@Component({
  selector: 'app-left-sidebar',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.scss']
})

export class LeftSidebarComponent {
  menuList = MENU_LIST;
  selectedMenu: any = '';
  constructor(private video: VideoConfigService) {
    this.selectedMenu = this.menuList[0];
  }

  setMenuActive(menu: any): void {
    this.selectedMenu = menu;
    this.video.slctdEvent.next(menu.type)
  }
  addElement(elem: any) {
    this.video.pauseVideo.next(true);
    setTimeout(() => {
      let val: any = this.video.$selectedElements.value;
      elem["id"] = "" + val.length;
      this.setDuration(elem);
      val.push(JSON.parse(JSON.stringify(elem)));
      this.video.$selectedElements.next(val);
    })
  }

  setDuration(elem: any) {
    elem["config"]["duration"]["start"] = this.video.currentVideoTime;
    let End = +this.video.currentVideoTime + 5;
    if (End <= this.video.totalVideoDuration) {
      elem["config"]["duration"]["end"] = End;
    } else {
      elem["config"]["duration"]["end"] = this.video.totalVideoDuration ? +this.video.totalVideoDuration : End;
    }
  }

}
