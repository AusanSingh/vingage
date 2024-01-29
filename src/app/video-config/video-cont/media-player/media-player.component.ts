import { Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { VideoConfigService } from '../../services/video-config.service';
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
  zoomScale = 1;
  zoomFactor = 0.05;
  panzoomCanvas: any = null;
  playerRef: any;
  slctdEvent: any;
  @ViewChild('canvas') canvasElement: ElementRef | any;
  elements: any = [];


  constructor(public video: VideoConfigService, private elementRef: ElementRef) {
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
      // src: 'https://golustoragetest.blob.core.windows.net/asset-2f22152e-64aa-4d19-8cc1-b45946c2a048/video_2.mp4?se=2024-01-26T16%3A24%3A00Z&sp=r&sv=2023-11-03&sr=b&sig=7nbEuGsbEnJ7fWIHQnA2XJ/6KOBawW7LIHDV/aApLg0%3D',
      src: 'assets/video/video_2.mp4',
      type: 'video/mp4',
    };

    this.playerRef.src([source]);

    // Listen for loadedmetadata event to get total duration
    this.playerRef.addEventListener('loadedmetadata', () => {
      this.video.totalVideoDuration = +this.playerRef.duration().toFixed(2); // Total duration in seconds
    });

    this.playVideoAtSpecificTime();

    // Event listener to get current time
    this.playerRef.addEventListener('timeupdate', () => {
      this.video.currentVideoTime = +this.playerRef.currentTime().toFixed(2);
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
    this.playerRef.currentTime(0.9);
    this.playerRef.pause(); // Optionally, start playing after setting the time
  }

  // onCanvasZoom(event) {
  //   if (event.deltaY < 0) {
  //     console.log('scrolling up', this.zoomLevel);
  //     this.zoomLevel += this.zoomFactor;
  //   } else if (event.deltaY > 0) {
  //     console.log('scrolling down', this.zoomLevel);
  //     this.zoomLevel -= this.zoomFactor;
  //   }
  // }

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
    this.video.setElementDataForConfig.next(this.elements[_Index])
  }

}
