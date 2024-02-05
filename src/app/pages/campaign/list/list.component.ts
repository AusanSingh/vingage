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
  campaignList: any[] = [];
  modalRef?: BsModalRef;
  currentChannel: any = null;

  constructor(
    private auth: AuthenticationService,
    private toastr: ToastrService,
    private modalService: BsModalService
  ) { }

  ngOnInit() {
    this.getList();
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
    this.campaignList = [
      {
        name: 'Promotional',
        template: 'Promotional',
        type: 'Voice',
        output: 'URL',
        created_at: '07 July 2022',
        view: 88,
        clicks: 60
      },
      {
        name: 'Promotional',
        template: 'Promotional',
        type: 'Voice',
        output: 'URL',
        created_at: '07 July 2022',
        view: 88,
        clicks: 60
      },
      {
        name: 'Promotional',
        template: 'Promotional',
        type: 'Voice',
        output: 'URL',
        created_at: '07 July 2022',
        view: 88,
        clicks: 60
      },
      {
        name: 'Promotional',
        template: 'Promotional',
        type: 'Voice',
        output: 'URL',
        created_at: '07 July 2022',
        view: 78,
        clicks: 60
      },
      {
        name: 'Promotional',
        template: 'Promotional',
        type: 'Voice',
        output: 'URL',
        created_at: '07 July 2022',
        view: 22,
        clicks: 11
      }
    ];
  }
  deleteChannel() {
    this.auth.deleteRequest(`/api/v1/channel/?id=${this.currentChannel?.id}`)
      .subscribe({
        next: (res) => {
          this.modalRef?.hide();
          this.campaignList = this.campaignList.filter(item => item !== this.currentChannel);
          this.toastr.success('Deleted successfully!')
        },
        error: (err) => {
          this.modalRef?.hide();
        }
      }
      )
  }
}
