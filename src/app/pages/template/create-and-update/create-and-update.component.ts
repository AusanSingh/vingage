import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { forkJoin, map } from 'rxjs';
import { AuthenticationService } from 'src/app/shared/services/authentication.service';

var default_url: any = {
  xml_api: {
     push_msg_url:"https://api.myvfirst.com/psms/servlet/psms.Eservice2",
     media_push_msg_url:"https://api.myvfirst.com/psms/servlet/psms.Eservice2",
     media_download_url:"https://whatsapp.myvfirst.com/WhatsappRestApi/rest/api/downloadmedia/",
     media_upload_url:"https://whatsapp.myvfirst.com/WhatsappRestApi/rest/api/upload/media",
     campaign_push_url:"https://api.myvfirst.com/psms/servlet/psms.Eservice2",
     location_push_url:"https://api.myvfirst.com/psms/servlet/psms.Eservice2",
     list_view_json_url:"https://api.myvfirst.com/psms/servlet/psms.Eservice2" 
  },
  karix_api: {
    push_msg_url:"https://rcmapi.instaalerts.zone/services/rcm/sendMessage"
  },
  unified_api: {
     push_msg_url:"https://sms-service.myvfirst.com/psms/v2/send",
     media_push_msg_url:"https://sms-service.myvfirst.com/psms/v2/send",
     media_upload_url:"https://whatsapp.myvfirst.com/WhatsappRestApi/rest/api/upload/media",
     media_download_url:"https://whatsapp.myvfirst.com/WhatsappRestApi/rest/api/downloadmedia/",
     campaign_push_url:"https://sms-service.myvfirst.com/psms/v2/send",
     location_push_url:"https://sms-service.myvfirst.com/psms/v2/send",
     list_view_json_url:"https://sms-service.myvfirst.com/psms/v2/send"
  }
}


@Component({
  selector: 'app-create-and-update',
  templateUrl: './create-and-update.component.html',
  styleUrls: ['./create-and-update.component.scss']
})
export class CreateAndUpdateComponent implements OnInit{
  whatsappForm: FormGroup;
  channelId = '';
  urlRegex = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([/\w\.-]*)*\/?(\?[\w%&=-]*)?$/;


  constructor(
    private fb: FormBuilder,
    private auth: AuthenticationService,
    private route: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router
  ) {

    this.channelId = this.route.snapshot.paramMap.get('channel-id') as string;

    this.whatsappForm = this.fb.group({
      "name": ["", Validators.required],
      "identifier": ["", Validators.required],
      "action_type": "bot_action",
      "is_active": false,
      "service_name": "whatsapp",
      "queue_group": "",
      "service_meta": this.fb.group({
        "api_type": "xml_api",
        "api_auth": this.fb.group({
          "auth_type": "basic_auth",
          "auth_details": this.fb.group({
            "user_id": [""],
            "password": [""],
            "api_key": [""],
            "api_token": [""]
          })
        }),
        "api_info": this.fb.group({
          "push_msg_url": ["", [Validators.pattern(this.urlRegex)]],
          "media_push_msg_url": ["", [Validators.pattern(this.urlRegex)]],
          "media_download_url": ["", [Validators.pattern(this.urlRegex)]],
          "media_upload_url": ["", [Validators.pattern(this.urlRegex)]],
          "campaign_push_url": ["", [Validators.pattern(this.urlRegex)]]
        }),
        "flow_url": ["", [Validators.pattern(this.urlRegex)]],
        "throttle_enabled": true
      }),
      "action_meta": this.fb.group({
        "bot_id": ["", Validators.required]
      }),
    })
  }

  get push_msg_url()  { return this.whatsappForm?.get('service_meta')?.get('api_info')?.get('push_msg_url');}
  get media_push_msg_url()  { return this.whatsappForm?.get('service_meta')?.get('api_info')?.get('media_push_msg_url');}
  get media_download_url()  { return this.whatsappForm?.get('service_meta')?.get('api_info')?.get('media_download_url');}
  get media_upload_url()  { return this.whatsappForm?.get('service_meta')?.get('api_info')?.get('media_upload_url');}
  get campaign_push_url()  { return this.whatsappForm?.get('service_meta')?.get('api_info')?.get('campaign_push_url');}
  get flow_url()  { return this.whatsappForm?.get('service_meta')?.get('flow_url');}
  get api_type() { return this.whatsappForm?.get('service_meta')?.get('api_type')?.value }
  get auth_type() { return this.whatsappForm?.get('service_meta')?.get('api_auth')?.get('auth_type')?.value }
  
  whatsapp_auth_type = [];
  whatsapp_api_type = [];
  ngOnInit() {
    this.getBotList();
    let meta: any = this.auth.$metaData.value;
    console.log(meta)
    if(meta && meta["whatsapp_auth_type"]) this.whatsapp_auth_type = meta["whatsapp_auth_type"];
    if(meta && meta["whatsapp_api_type"]) this.whatsapp_api_type = meta["whatsapp_api_type"];
  }

  getDistinct() {
    this.auth.getRequest(`/api/queue/distinct`)
      .subscribe({
        next: (res) => {
         console.log(res)
        },
        error: (error) => {
          console.log(error);
        }
      });
  }

  firstTimeAPIurl: boolean = false;
  getDetails() {
    this.auth.getRequest(`/api/v1/channel/${this.channelId}`)
      .subscribe({
        next: (res) => {
          this.firstTimeAPIurl = true;
          this.whatsappForm.patchValue(res);
          this.whatsappForm.get('identifier')?.disable({ onlySelf: true });
          this.whatsappForm.get('name')?.disable({ onlySelf: true });
        },
        error: (error) => {
          console.log(error);
        }
      });
  }


  createOrUpdate(isUpdate: boolean, data: any) {
    const url = isUpdate ? `/api/channel/whatsapp/${this.channelId}` : '/api/channel/whatsapp';

    if(isUpdate) return this.auth.putRequest(url, data)
    else return this.auth.postRequest(url, data)
  }
  botList: any[] = [];
  distinctList: any[] = [];
  getBotList() {
    return forkJoin([
      this.auth.getRequest(`/api/list_user_bots`),
      this.auth.getRequest(`/api/queue/distinct`),
    ]
    )
    .subscribe({
      next: (res) => {
        let bot_list: any = res[0];
        let distinct: any = res[1];

        if(this.channelId) this.getDetails();
        else this.apiTypeChange('xml_api');
        this.botList = bot_list.response;
        this.distinctList = distinct;
      },
      error: () => {
        this.toastr.error("Something went wrong while getting bots and distinct.")
      }
    })
    
  }

  apiTypeChange(value: string) {
    if(!this.firstTimeAPIurl) {
      this.whatsappForm.get('service_meta')?.get('api_info')?.patchValue(default_url[value]);
    };
    this.firstTimeAPIurl = false;
  }


  onSubmit() {
    if (this.whatsappForm.invalid) return;
    const isUpdate = !!this.channelId;
    let data = this.whatsappForm.value;

    if(isUpdate) {
    }


    this.createOrUpdate(isUpdate, data)
      .subscribe({
        next: (res) => {
          console.log(res);
          if(isUpdate) {
            this.toastr.success("Updated Successfully!");
            return;
          }
          this.toastr.success("Created Successfully!");
          this.router.navigateByUrl('/video/whatsapp/list');
        },
        error: (error) => {
          console.log(error);
        }
      })
  }
}
