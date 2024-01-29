import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

@Component({
  selector: 'app-create-and-update',
  templateUrl: './create-and-update.component.html',
  styleUrls: ['./create-and-update.component.scss']
})
export class CreateAndUpdateComponent implements OnInit{
  createTemplateForm: FormGroup;
  uploadVideoForm: FormGroup;
  title?: string;
  closeBtnName?: string;
  list: string[] = [];

  currentStep = 1;

  constructor(
    private fb: FormBuilder,
    private auth: AuthenticationService,
    private toastr: ToastrService,
    public bsModalRef: BsModalRef,
    private http: HttpClient,
    private route: Router
  ) {
    this.createTemplateForm = this.fb.group({
      "name": ["", Validators.required],
      "description": ["", Validators.required]
    })
    this.uploadVideoForm = this.fb.group({
      "file": [null, Validators.required],
    })
  }

  ngOnInit() {
    // this.list.push('PROFIT!!!');
    // this.currentStep = 2;
  }


  currentTemplate: any;

  createTemplate() {
    if (this.createTemplateForm.invalid) return;
    let data = this.createTemplateForm.value;

    const url = '/api/v1/user/create-template/';

    this.auth.postRequest(url, data)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.currentTemplate = res;
         
          this.toastr.success("Created Successfully!");
          this.currentStep = 2;
        },
        error: (error) => {
          console.log(error);
        }
      })
  }

  resetFile(file: HTMLInputElement) {
    file['value'] = '';
    file.dispatchEvent(new Event('change'));
  } 
  selectedFile?: File;
  onFileChange(event: any) {
    this.selectedFile = (event.target as HTMLInputElement)?.files?.[0];
  }

  uploadVideo(res: any) {
    this.http.put(res.url, this.selectedFile, this.auth.http_media_option)
    .subscribe({
      next: (res) => {
        this.bsModalRef.hide();
        this.toastr.success("Video uploaded successfully.");
        this.route.navigateByUrl('/video-config/'+this.currentTemplate.template_id);
      },
      error: () => {

      }
    });
  }

  getPresignedAndUploadVideo() {
    if(!this.selectedFile) return;

    let data = {
      "file_name": this.selectedFile?.name,
      "template_id": this.currentTemplate.template_id
    }

    console.log(this.uploadVideoForm.value)


    this.auth.postRequest(`/api/v1/media/get_presigned_url`, data)
    .subscribe({
      next: (res) => {
        console.log(res)
        this.uploadVideo(res);
      },
      error: () => {

      }
    });
  }
}
