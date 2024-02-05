import { Component, OnInit, TemplateRef } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { BsModalRef, BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { CreateAndUpdateComponent } from './create-and-update/create-and-update.component';
import { Router } from '@angular/router';

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
    private modalService: BsModalService,
    private router: Router,
  ) {
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

  ngOnInit(): void { }

}
