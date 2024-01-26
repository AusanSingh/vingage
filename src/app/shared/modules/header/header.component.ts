import { Component,OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  openSidebar: boolean = false;
  isLoading: boolean = false;
  user: any;
  circleName: any;
  headTitle: string = '';
  userDropdown = []
  constructor(
    public auth: AuthenticationService,
  ){}

  showSidebar() {
    this.openSidebar = true;
  }
  circleNameFunc() {
    let value = '';
    if (this.user) value = this.user?.email;
    if(!value) return;
    let splits = value.split(" ");
    splits = splits.filter(split => {
      return split !== "";
    });
    if (splits.length > 0) {
      if (splits.length === 1) this.circleName = splits[0][0];
      else this.circleName = splits[0][0] + splits[1][0];
    }
  }
  logout(event: any) {
    event.preventDefault();
    this.isLoading = true;
    this.auth.logout();
    this.isLoading = false;
  }
  ngOnInit(): void {
    this.auth.$currentUser.subscribe(
      (user: any) => {
        if (user) this.user = user;
        this.circleNameFunc();
      }
    )
  }

}
