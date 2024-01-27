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
  closeSidebar:boolean = false;
  menuItems: NavLinks[]  = MENU_LIST;

  toggleSidebar(){
    this.closeSidebar = !this.closeSidebar;
    document.getElementsByTagName('body')[0].classList.toggle("page-pd");
    this.menuItems.forEach(function(elem, index){
      if(elem.children)
        elem.isCollapsed = true;
    })
    // window.addEventListener("resize", function(){});
    window.dispatchEvent(new Event('resize'));
    
  }
  closeMenu(){
    let nav = document.getElementsByClassName("sidebar")[0];
    this.sideBarStatus.emit(false);
    nav.classList.remove("min_width_toggle");
  }
  constructor(
    private _auth: AuthenticationService  
  ) {
    this.openSidebar = false;
   }

  ngOnInit(): void {
  }
  
  submenuToggle(menu:NavLinks){
    if (menu.children && menu.children.length){ 
      this.menuItems.forEach((elem,index) => { if(menu.name != elem.name) elem.isCollapsed = true})
      menu.isCollapsed = !menu.isCollapsed;
    }
    else
      this.closeMenu();
  }
}
