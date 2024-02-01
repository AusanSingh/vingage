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
  @Input() editor:boolean | undefined;
  zoomScale = 1;
  zoomFactor = 0.05;
  panzoomCanvas: any = null;
  playerRef: any;
  slctdEvent: any;
  @ViewChild('canvas') canvasElement: ElementRef | any;
  elements: any = [
    {
        "name": "Subheading",
        "icon": "",
        "tag": "h2",
        "type": "text",
        "config": {
            "action": "",
            "font_size": 14,
            "position": {
                "x": 100,
                "y": 150
            },
            "color": "#000000",
            "duration": {
                "start": 2,
                "end": 7
            },
            "text": "Subheading",
            "width": 189,
            "height": 47,
            "font_family": "Open Sans",
            "font_style": "normal",
            "effect": "",
            "background": "#ffffff"
        },
        "id": 0
    },
    {
        "name": "Body",
        "icon": "",
        "tag": "p",
        "type": "text",
        "config": {
            "action": "",
            "font_size": 12,
            "position": {
                "x": 20,
                "y": 30
            },
            "color": "#000000",
            "duration": {
                "start": 2,
                "end": 7
            },
            "text": "Body",
            "width": 189,
            "height": 47,
            "font_family": "Open Sans",
            "font_style": "normal",
            "effect": "",
            "background": "#ffffff"
        },
        "id": 1
    }
];


  constructor(public video: VideoConfigService, private elementRef: ElementRef) {
    this.video.$selectedElements.subscribe(elem => {
      // this.elements = elem;
      console.log(this.elements)
    })
    video.slctdEvent.subscribe(res => {
      this.slctdEvent = res;
    })
    video.pauseVideo.subscribe(res => {
      if (res) {
        this.pauseVideo();
      }
    })
  }

  getStyles(item: any) {
    return { 
      'left': item.config.position.x + 'px', 
      'top': item.config.position.y + 'px', 
      'color': item.config.color,
      'font-size': item.config.font_size + 'px',
      'width': item.config.width + 'px',
      'height': item.config.height + 'px',
      'font-family': item.config.font_family,
      'font-style': item.config.font_style,
      'background': item.config.background,
  }
  }

  ngAfterViewInit() {
    this.initializeAzureMediaPlayer();
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

  private initializeAzureMediaPlayer(): void {
    const options = {
      controls: true,
      autoplay: true,
      width: '607',
      height: '391',
      // Add other Azure Media Player options as needed
    };

    this.playerRef = amp(this.elementRef.nativeElement.querySelector('#azuremediaplayer'), options);

    // Load your media source
    const source = {
      src: 'assets/video/video_2.mp4',
      type: 'video/mp4',
    };

    this.playerRef.src([source]);

    // Listen for loadedmetadata event to get total duration
    this.playerRef.addEventListener('loadedmetadata', () => {
      this.video.totalVideoDuration = +(Math.floor(this.playerRef.duration())); // Total duration in seconds
    });

    // Listen for the play event
    this.playerRef.addEventListener('play', () => {
      setTimeout(() => {
        this.video.totalVideoDuration = +(Math.floor(this.playerRef.duration()));
      })
    });

    // this.playVideoAtSpecificTime();

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

  playVideoAtSpecificTime() {
    this.playerRef.currentTime(1);
    this.playerRef.pause(); // Optionally, start playing after setting the time
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
      (elementMovingRect.left - elementMovingParentElementRect.left) /
      this.zoomScale;
    this.elements[Index].config.position.y =
      (elementMovingRect.top - elementMovingParentElementRect.top) /
      this.zoomScale;
    const cdkDrag = $event.source as CdkDrag;
    cdkDrag.reset();
    this.panzoomCanvas.resume();
  }

  setElementForConfig(_Index: number) {
    this.pauseVideo();
    this.video.setElementDataForConfig.next(this.elements[_Index])
  }

}