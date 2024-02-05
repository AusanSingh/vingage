import { Component, Input, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';
import { VideoConfigService } from 'src/app/shared/services/video-config.service';

@Component({
  selector: 'app-video-config-header',
  templateUrl: './video-config-header.component.html',
  styleUrls: ['./video-config-header.component.scss']
})
export class VideoConfigHeaderComponent {
  allElements: any;
  @Input() templateData: any;
  isLoading = false;

  constructor(public video: VideoConfigService, public auth: AuthenticationService,
    private toastr: ToastrService, private router: Router) {
    this.allElements = []
    video.$selectedElements.subscribe(elem => {
      this.allElements = elem;
    })
  }

  sendData(IsPreviewAlso = false) {
    this.isLoading = true;
    console.log(this.allElements)
    let req = {
      meta_data: this.allElements
    }
    this.auth.putRequest(`/api/v1/user/update-template-meta/${this.templateData.template_id}`, req)
      .subscribe({
        next: (res: any) => {
          this.isLoading = false;
          this.toastr.success("Updated successfully");
          if (IsPreviewAlso) {
            window.open(`/vingage/${this.templateData?.template_id}`, '_blank');
          } else {
            this.router.navigateByUrl("/template/list");
          }
        },
        error: (err) => {
          this.isLoading = false;
          this.toastr.error("Something went wrong");
        }
      })
  }



}
