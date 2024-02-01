import { Component, Input } from '@angular/core';
import { VideoConfigService } from 'src/app/shared/services/video-config.service';

@Component({
  selector: 'app-comp-style-effect',
  templateUrl: './comp-style-effect.component.html',
  styleUrls: ['./comp-style-effect.component.scss']
})
export class CompStyleEffectComponent {
  @Input() element: any;
  @Input() config: any;

  constructor(public video: VideoConfigService) {
  }
}
