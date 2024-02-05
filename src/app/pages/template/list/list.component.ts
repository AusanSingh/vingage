import { Component, TemplateRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  templateList: any[] = [];
  modalRef?: BsModalRef;
  isLoader: any = false;

  constructor(
    private auth: AuthenticationService,
    private toastr: ToastrService,
    private modalService: BsModalService,
  ) { }

  ngOnInit() {
    this.getList();
  }

  openModal(e: any, template: TemplateRef<any>, templ: any) {
    e.preventDefault();
    this.currentTemplate = templ;
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }

  decline(): void {
    this.modalRef?.hide();
  }

  getList() {
    this.isLoader = true;
    this.templateList = [];
    // return;
    this.auth.getRequest(`/api/v1/user/templates`)
      .subscribe({
        next: (res) => {
          this.templateList = res;
          this.isLoader = false;
        },
        error: () => {
          this.isLoader = false;
        }
      })
  }
  currentTemplate: any;
  deleteTemplate() {
    this.auth.deleteRequest(`/api/v1/user/delete-template/${this.currentTemplate?.template_id}/`)
      .subscribe({
        next: (res) => {
          this.modalRef?.hide();
          this.templateList = this.templateList.filter(item => item !== this.currentTemplate);
          this.toastr.success('Deleted successfully!')
        },
        error: (err) => {
          this.modalRef?.hide();
        }
      }
      )
  }
}
