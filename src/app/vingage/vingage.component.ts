import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../shared/services/authentication.service';
import { VideoConfigService } from '../shared/services/video-config.service';

@Component({
  selector: 'app-vingage',
  templateUrl: './vingage.component.html',
  styleUrls: ['./vingage.component.scss']
})
export class VingageComponent {

  templateData: any;
  constructor(private video: VideoConfigService, private _activatedRoute: ActivatedRoute, private router: Router, public auth: AuthenticationService, private toastr: ToastrService,) { }

  ngOnInit() {
    let TemplateId = this._activatedRoute.snapshot.params['template-id'];
    if (!TemplateId) {
      this.router.navigate(['/template/list']);
    }
    this.getTemplateData(TemplateId);
  }

  getTemplateData(TemplateId: any) {
    this.auth.getRequest(`/api/v1/user/template-info/${TemplateId}/`)
      .subscribe({
        next: (res: any) => {
          this.templateData = res;
          this.templateData.meta_data = this.templateData?.meta_data?.filter((x: any) => !(x.config.action == 'tts' || x.config.action == 'text_to_video'));
          this.video.$selectedElements.next(this.templateData.meta_data);
        },
        error: (err) => {
          this.toastr.error("Something went wrong");
        }
      }
      )
  }

}
