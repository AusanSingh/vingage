import { Component, TemplateRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  videoList: any[] = [];
  modalRef?: BsModalRef;
  currentChannel: any = '';
  user: any;

  constructor(
    private auth: AuthenticationService,
    private toastr: ToastrService,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.getList();
    this.auth.$currentUser.subscribe(res => this.user = res);
  }

  openModal(e: any, template: TemplateRef<any>, channel: any) {
    e.preventDefault();
    this.currentChannel = channel;
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  decline(): void {
    this.modalRef?.hide();
  }

  getList() {
    this.videoList = [
      {
          "name": "bhanu",
          "description": "dgfhjk",
          "file_name": "",
          "meta_data": {},
          "status": "",
          "uploaded_url": "",
          "transformed_url": "",
          "created_at": "2024-01-28T14:12:14.983000",
          "updated_at": "2024-01-28T14:12:14.983000",
          "template_id": "8402241ce0"
      },
      {
          "name": "bhanu",
          "description": "dgfhjk",
          "file_name": "",
          "meta_data": {},
          "status": "",
          "uploaded_url": "",
          "transformed_url": "",
          "created_at": "2024-01-28T14:32:30.374000",
          "updated_at": "2024-01-28T14:32:30.374000",
          "template_id": "d2a176a9ca"
      },
      {
          "name": "text2-attachment",
          "description": "aaa",
          "file_name": "",
          "meta_data": {},
          "status": "",
          "uploaded_url": "",
          "transformed_url": "",
          "created_at": "2024-01-28T15:11:19.925000",
          "updated_at": "2024-01-28T15:11:19.925000",
          "template_id": "11ed3d0275"
      },
      {
          "name": "bhanu",
          "description": "dgfhjk",
          "file_name": "",
          "meta_data": {},
          "status": "",
          "uploaded_url": "",
          "transformed_url": "",
          "created_at": "2024-01-29T04:15:14.310000",
          "updated_at": "2024-01-29T04:15:14.310000",
          "template_id": "b8d56b04f9"
      },
      {
          "name": "bhanu7",
          "description": "dgfhjk",
          "file_name": "",
          "meta_data": {},
          "status": "",
          "uploaded_url": "",
          "transformed_url": "",
          "created_at": "2024-01-29T05:03:14.091000",
          "updated_at": "2024-01-29T05:03:14.091000",
          "template_id": "125b92eba8"
      }
  ]
    // return;
    this.auth.getRequest(`/api/v1/user/templates`)
      .subscribe({
        next: (res) => {
          this.videoList = res;
          console.log('video', res)
        },
        error: () => {

        }
      })
  }

  deleteTemplate() {
    return
    this.auth.deleteRequest(`/api/v1/channel/?id=${this.currentChannel?.id}`)
      .subscribe({
        next: (res) => {
          console.log(res)
          this.modalRef?.hide();
          this.videoList = this.videoList.filter(item => item !== this.currentChannel);
          this.toastr.success('Deleted successfully!')
        },
        error: (err) => {
          this.modalRef?.hide();
        }
      }
      )
  }
}
