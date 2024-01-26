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

  }

  setMenuActive(menu: any): void {
    this.selectedMenu = menu;
  }
  addElement(elem: any){
    let val: any = this.video.$selectedElements.value;
    val.push(elem);
    this.video.$selectedElements.next(val)
  }
}
