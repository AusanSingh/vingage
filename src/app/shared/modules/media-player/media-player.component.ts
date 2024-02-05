import { Component, ElementRef, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { VideoConfigService } from 'src/app/shared/services/video-config.service';
declare const amp: any; // Declare Azure Media Player variable
import panzoom from 'panzoom';
import { CdkDrag } from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-media-player',
  templateUrl: './media-player.component.html',
  styleUrls: ['./media-player.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MediaPlayerComponent {
  @Input() editor: boolean | undefined;
  zoomScale = 1;
  zoomFactor = 0.05;
  panzoomCanvas: any = null;
  playerRef: any;
  slctdEvent: any;
  @ViewChild('canvas') canvasElement: ElementRef | any;
  templateId = "";
  elements: any = [];
  @Input() templateData?: any;
  activeEleId: any;

  constructor(public video: VideoConfigService, private elementRef: ElementRef
  ) {
    this.video.$selectedElements.subscribe(elem => {
      this.elements = elem;
    })

    video.slctdEvent.subscribe(res => {
      this.slctdEvent = res;
    })
    video.pauseVideo.subscribe(res => {
      if (res) {
        this.pauseVideo();
      }
    })
    video.playVideoAtSpecificTime.subscribe(res => {
      this.playVideoAtSpecificTime(res);
    })
  }

  ngOnInit() { }

  ngAfterViewInit() {
    this.panzoomCanvas = panzoom(this.canvasElement.nativeElement, {
      maxZoom: 1,
      minZoom: 1,
      autocenter: true
    });

    this.panzoomCanvas.on('transform', (e: any) => {
      let result = this.panzoomCanvas.getTransform();
      this.zoomScale = result.scale;
    });
  }
  ngOnChanges(): void {
    if (this.templateData) this.initializeAzureMediaPlayer();
  }

  initializeAzureMediaPlayer(): void {
    const options = {
      controls: true,
      autoplay: true,
      width: '500',
      height: '500',
      // Add other Azure Media Player options as needed
    };

    this.playerRef = amp(this.elementRef.nativeElement.querySelector('#azuremediaplayer'), options);

    // Load your media source
    const source = {
      src: !this.editor ? (this.templateData.transformed_url ? this.templateData.transformed_url : this.templateData.uploaded_url) : this.templateData.uploaded_url,
      type: 'video/mp4',
    };

    this.playerRef.src([source]);

    // Listen for loadedmetadata event to get total duration
    this.playerRef.addEventListener('loadedmetadata', () => {
      this.getDuration();
    });

    // Listen for the play event
    this.playerRef.addEventListener('play', () => {
      setTimeout(() => {
        this.getDuration();
      })
    });

    // Event listener to get current time
    this.playerRef.addEventListener('timeupdate', () => {
      this.video.currentVideoTime = +(Math.floor(this.playerRef.currentTime()));
    });
  }

  playVideo(): void {
    if (this.playerRef) {
      this.playerRef.play();
    }
  }
  pauseVideo(): void {
    if (this.playerRef) {
      this.playerRef.pause();
    }
  }

  playVideoAtSpecificTime(Time: any, Pause = true) {
    this.playerRef.currentTime(Time);
    if (Pause) {
      this.playerRef.pause(); // Optionally, start playing after setting the time
    }
  }

  dragConstrainPoint = (point: any, dragRef: any) => {
    let zoomMoveXDifference = 0;
    let zoomMoveYDifference = 0;

    if (this.zoomScale != 1) {
      zoomMoveXDifference =
        (1 - this.zoomScale) * dragRef.getFreeDragPosition().x;
      zoomMoveYDifference =
        (1 - this.zoomScale) * dragRef.getFreeDragPosition().y;
    }
    return {
      x: point.x + zoomMoveXDifference,
      y: point.y + zoomMoveYDifference,
    };
  };

  startDragging($event: any, Index: number) {
    this.panzoomCanvas.pause();
  }

  endDragging($event: any, Index: number) {
    const elementMoving = $event.source.getRootElement();
    const elementMovingRect: ClientRect = elementMoving.getBoundingClientRect();
    const elementMovingParentElementRect: ClientRect =
      elementMoving.parentElement.getBoundingClientRect();
    /* The getBoundingClientRect() method returns the size of an element and its position relative to the viewport.
    This method returns a DOMRect object with eight properties: left, top, right, bottom, x, y, width, height. https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_element_getboundingclientrect*/

    this.elements[Index].config.position.x =
      Math.round((elementMovingRect.left - elementMovingParentElementRect.left) /
        this.zoomScale);
    this.elements[Index].config.position.y =
      Math.round((elementMovingRect.top - elementMovingParentElementRect.top) /
        this.zoomScale);
    const cdkDrag = $event.source as CdkDrag;
    cdkDrag.reset();
    this.panzoomCanvas.resume();
  }

  setElementForConfig(elem: any) {
    const data = elem;
    this.activeEleId = elem.id;
    if (this.editor) {
      this.pauseVideo();
      this.video.setElementDataForConfig.next(data);
    } else {
      if (data.type === 'button') {
        const config = data.config;
        switch (config.action) {
          case 'change_video_time':
            this.playVideoAtSpecificTime(+config.go_to_duration, false);
            break;
          case 'go_to_link':
            window.open(config.action_url, '_blank');
            break;
        }
      }
    }
  }


  getDuration() {
    this.video.totalVideoDuration = +(Math.floor(this.playerRef.duration())); // Total duration in seconds
  }

}
