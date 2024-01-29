import { Component,OnInit, TemplateRef } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { CreateAndUpdateComponent } from './create-and-update/create-and-update.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  openSidebar: boolean = false;
  isLoading: boolean = false;
  user: any = {
    email: 'test@vingage.com'
  };
  circleName: any;
  headTitle: string = '';
  userDropdown = []
  bsModalRef?: BsModalRef;
  
  constructor(
    public auth: AuthenticationService,
    private modalService: BsModalService
  ){
  }

  openModalWithComponent() {
    const initialState: ModalOptions = {
      initialState: {
        list: ['Open a modal with component', 'Pass your data', 'Do something else', '...'],
        title: 'Modal with component'
      }
    };
    this.bsModalRef = this.modalService.show(CreateAndUpdateComponent, initialState);
    this.bsModalRef.content.closeBtnName = 'Close';
  }


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
