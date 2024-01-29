import { Component, ViewChild, ElementRef, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { VideoConfigService } from '../services/video-config.service';

@Component({
  selector: 'app-video-cont',
  templateUrl: './video-cont.component.html',
  styleUrls: ['./video-cont.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VideoContComponent {
  slctdEvent: any;

  constructor(private video: VideoConfigService) {
    video.slctdEvent.subscribe(res => {
      this.slctdEvent = res;
    })
  }

  ngAfterViewInit() {

  }

}

