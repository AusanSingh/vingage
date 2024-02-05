import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { VideoConfigService } from 'src/app/shared/services/video-config.service';
import { AuthenticationService } from '../shared/services/authentication.service';

@Component({
  selector: 'app-video-config',
  templateUrl: './video-config.component.html',
  styleUrls: ['./video-config.component.scss']
})
export class VideoConfigComponent {

  templateData: any;
  isLoading = false;

  constructor(
    private video: VideoConfigService,
    private _activatedRoute: ActivatedRoute,
    private router: Router,
    public auth: AuthenticationService,
    private toastr: ToastrService) { }

  ngOnInit() {
    let TemplateId = this._activatedRoute.snapshot.params['template-id'];
    if (!TemplateId) {
      this.router.navigate(['/template/list']);
    }
    this.getTemplateData(TemplateId);
  }

  ngOnDestroy() {
    this.video.$selectedElements.next([]);
  }

  getTemplateData(TemplateId: any) {
    this.isLoading = true;
    this.auth.getRequest(`/api/v1/user/template-info/${TemplateId}/`)
      .subscribe({
        next: (res: any) => {
          if (res) {
            this.isLoading = false;
            this.templateData = res;
            this.video.$selectedElements.next(this.templateData.meta_data);
          }
        },
        error: (err) => {
          this.isLoading = false;
        }
      })
  }

}
