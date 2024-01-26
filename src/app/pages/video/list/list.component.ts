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
        id: '11',
        url: 'http://video-url.com/video',
        name: 'Name',
        description: 'Description'
      }
    ]
    return;
    this.auth.getRequest(`/api/v1/channel?type=whatsapp`)
      .subscribe({
        next: (res) => {
          this.videoList = res;
          console.log('video', res)
        },
        error: () => {

        }
      })
  }

  deleteChannel() {
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
