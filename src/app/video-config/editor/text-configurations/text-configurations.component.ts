import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { VideoConfigService } from 'src/app/shared/services/video-config.service';

@Component({
  selector: 'app-text-configurations',
  templateUrl: './text-configurations.component.html',
  styleUrls: ['./text-configurations.component.scss']
})
export class TextConfigurationsComponent {

  @Input() element: any;
  sublabel = "To add variables enter values in double curly brackets. For e.g.: { { name } }, { { age } } etc.";
  actions = [{ key: "Text to speech", value: "tts" }, { key: "Text to video", value: "text_to_video" }];
  config = {
    show_font_size: true,
    show_font_family: true,
    show_font_style: true,
    show_color: true,
    show_effect: true,
    show_bg_color: true,
    show_width: true,
    show_height: true,
  }

  constructor(public video: VideoConfigService) {

  }

}
