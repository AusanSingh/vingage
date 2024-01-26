import { Component } from '@angular/core';
const MENU_LIST = [
  {
    name: 'Text',
    icon: 'icon-text',
    children: [
      {
        name: 'Heading 1',
        icon: '',
        id: 'h_1'
      },
      {
        name: 'Heading 2',
        icon: '',
        id: 'h_2'
      },
    ],
    id: 'text',
  },
  {
    name: 'Button',
    icon: 'icon-button',
    id: 'button',
    children: [
      {
        name: 'Add Button',
        icon: '',
        id: 'add_button'
      }
    ],
  },
];

@Component({
  selector: 'app-left-sidebar',
  templateUrl: './left-sidebar.component.html',
  styleUrls: ['./left-sidebar.component.scss']
})

export class LeftSidebarComponent {
  menuList = MENU_LIST;
  selectedMenu: any = '';

  setMenuActive(menu: any): void {
    this.selectedMenu = menu;
  }
}
