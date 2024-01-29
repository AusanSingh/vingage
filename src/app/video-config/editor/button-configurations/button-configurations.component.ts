import { Component, Input } from '@angular/core';
import { VideoConfigService } from '../../services/video-config.service';

@Component({
  selector: 'app-button-configurations',
  templateUrl: './button-configurations.component.html',
  styleUrls: ['./button-configurations.component.scss']
})
export class ButtonConfigurationsComponent {
  @Input() element: any;
  actions = [{ key: "Go to link", value: "go_to_link" }, { key: "Change video time", value: "change_video_time" }];
  config = {
    show_font_family: true,
    show_font_size: true,
    show_font_style: true,
    show_color: false,
    show_effect: false,
  }
  action_url = "";
  constructor(public video: VideoConfigService) {
  }

}
