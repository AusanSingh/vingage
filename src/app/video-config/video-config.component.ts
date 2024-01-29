import { Component } from '@angular/core';
import { VideoConfigService } from './services/video-config.service';

@Component({
  selector: 'app-video-config',
  templateUrl: './video-config.component.html',
  styleUrls: ['./video-config.component.scss']
})
export class VideoConfigComponent {

  constructor(private video: VideoConfigService) { }

  ngOnDestroy() {
    this.video.$selectedElements.next([]);
    this.video.$selectedElements.unsubscribe();
    this.video.setElementDataForConfig.unsubscribe();
    this.video.slctdEvent.unsubscribe();
    this.video.pauseVideo.unsubscribe();
    this.video.playVideoAtSpecificTime.unsubscribe();
  }

}
