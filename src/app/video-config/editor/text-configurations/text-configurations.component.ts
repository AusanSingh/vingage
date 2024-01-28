import { Component, Input } from '@angular/core';
import { VideoConfigService } from '../../services/video-config.service';

@Component({
  selector: 'app-text-configurations',
  templateUrl: './text-configurations.component.html',
  styleUrls: ['./text-configurations.component.scss']
})
export class TextConfigurationsComponent {

  @Input() element: any;
  sublabel = "To add variables enter values in double curly brackets. For e.g.: { { name } }, { { age } } etc.";

  constructor(public video: VideoConfigService) {

  }

}
