import { Component } from '@angular/core';
import { MENU_LIST } from '../services/constant-data';
import { VideoConfigService } from '../services/video-config.service';


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
    let val: any = this.video.$selectedElements.value;
    elem["id"] = val.length;
    elem["config"]["duration"]["start"] = this.video.currentVideoTime;
    val.push(JSON.parse(JSON.stringify(elem)));
    this.video.$selectedElements.next(val);
  }
}
