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
    private router: Router,
    public bsModalRef: BsModalRef
  ) {
    this.createTemplateForm = this.fb.group({
      "name": ["", Validators.required],
      "description": ["", Validators.required]
    })
    this.uploadVideoForm = this.fb.group({
      "file": ["", Validators.required],
    })
  }

  ngOnInit() {
    this.list.push('PROFIT!!!');
  }







  createTemplate() {
    if (this.createTemplateForm.invalid) return;
    let data = this.createTemplateForm.value;

    const url = '/api/v1/user/create-template/';

    this.auth.postRequest(url, data)
      .subscribe({
        next: (res) => {
          console.log(res);
         
          this.toastr.success("Created Successfully!");
          // this.router.navigateByUrl('/video-config/212');
          this.currentStep = 2;
        },
        error: (error) => {
          console.log(error);
        }
      })
  }


  onFileChange(event: any) {
    const file = (event.target as HTMLInputElement)?.files?.[0];
    this.uploadVideoForm.patchValue({
      file
    });
  }

  uploadVideo() {

  }
}
