import { Component, OnInit,Input, Output, EventEmitter, NgModule  } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { NavLinks } from '../../models/navlinks.model';
import { MENU_LIST } from '../../models/global.constant';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Input('openSidebar') openSidebar: boolean;
  @Output() sideBarStatus = new EventEmitter<boolean>(false);
  menuItems: NavLinks[]  = MENU_LIST;

 
  
  constructor(
    private _auth: AuthenticationService  
  ) {
    this.openSidebar = false;
   }

  ngOnInit(): void {
  }
  
  
}
