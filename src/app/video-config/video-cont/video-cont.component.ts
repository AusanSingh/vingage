import { Component, ViewChild, ElementRef, AfterViewInit, ViewEncapsulation } from '@angular/core';
import { VideoConfigService } from '../services/video-config.service';
import panzoom from 'panzoom';
import { CdkDrag } from '@angular/cdk/drag-drop';
declare const amp: any; // Declare Azure Media Player variable


@Component({
  selector: 'app-video-cont',
  templateUrl: './video-cont.component.html',
  styleUrls: ['./video-cont.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class VideoContComponent {
  zoomScale = 1;
  zoomFactor = 0.05;
  panzoomCanvas: any = null;
  playerRef: any;

  @ViewChild('canvas') canvasElement: ElementRef | any;
  elements: any = [];
  constructor(private video: VideoConfigService, private elementRef: ElementRef) {
    this.video.$selectedElements.subscribe(elem => {
      this.elements = elem;
      console.log(this.elements)
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
      nativeControlsForTouch: true,
      autoplay: false,
      width: '500',
      height: '500',
      // Add other Azure Media Player options as needed
    };

    this.playerRef = amp(this.elementRef.nativeElement.querySelector('#azuremediaplayer'), options);

    // Load your media source
    const source = {
      src: 'assets/video/video_2.mp4',
      type: 'video/mp4',
    };

    this.playerRef.src([source]);
    // Event listener to get current time
    this.playerRef.addEventListener('timeupdate', () => {
      const currentTime = this.playerRef.currentTime();
      console.log('Current Time:', currentTime);
      // You can use 'currentTime' as needed in your application
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
    console.log(
      'freeDragPosition dragRef: ' +
      Math.round(dragRef.getFreeDragPosition().x) +
      ' / ' +
      Math.round(dragRef.getFreeDragPosition().y)
    );

    if (this.zoomScale != 1) {
      zoomMoveXDifference =
        (1 - this.zoomScale) * dragRef.getFreeDragPosition().x;
      zoomMoveYDifference =
        (1 - this.zoomScale) * dragRef.getFreeDragPosition().y;
    }
    console.log(
      'zoomMoveXDifference x/y: ' +
      Math.round(zoomMoveXDifference) +
      ' / ' +
      Math.round(zoomMoveYDifference)
    );
    console.log(
      'Point x/y: ' + Math.round(point.x) + ' / ' + Math.round(point.y)
    );
    console.log(
      'Sum x/y: ' +
      Math.round(point.x + zoomMoveXDifference) +
      ' / ' +
      Math.round(point.y + zoomMoveYDifference)
    );

    return {
      x: point.x + zoomMoveXDifference,
      y: point.y + zoomMoveYDifference,
    };
  };

  startDragging($event: any, Index: number) {
    console.log('START', Index);
    this.panzoomCanvas.pause();
  }

  endDragging($event: any, Index: number) {
    console.log('END', Index);
    const elementMoving = $event.source.getRootElement();
    const elementMovingRect: ClientRect = elementMoving.getBoundingClientRect();
    const elementMovingParentElementRect: ClientRect =
      elementMoving.parentElement.getBoundingClientRect();
    /* The getBoundingClientRect() method returns the size of an element and its position relative to the viewport.
    This method returns a DOMRect object with eight properties: left, top, right, bottom, x, y, width, height. https://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_element_getboundingclientrect*/
    console.log(
      'elementMovingParentElementRect .left/.top: ' +
      Math.trunc(elementMovingParentElementRect.left) +
      ' / ' +
      Math.trunc(elementMovingParentElementRect.top)
    );
    console.log(
      'elementMovingRect .left/.top: ' +
      Math.trunc(elementMovingRect.left) +
      ' / ' +
      Math.trunc(elementMovingRect.top)
    );
    console.log(
      'Difference scaled .left/.top: ' +
      Math.trunc(
        (elementMovingRect.left - elementMovingParentElementRect.left) /
        this.zoomScale
      ) +
      ' / ' +
      Math.trunc(
        (elementMovingRect.top - elementMovingParentElementRect.top) /
        this.zoomScale
      )
    );

    this.elements[Index].config.pos.x =
      (elementMovingRect.left - elementMovingParentElementRect.left) /
      this.zoomScale;
    this.elements[Index].config.pos.y =
      (elementMovingRect.top - elementMovingParentElementRect.top) /
      this.zoomScale;

    console.log(this.elements)
    const cdkDrag = $event.source as CdkDrag;
    cdkDrag.reset();
    this.panzoomCanvas.resume();
  }

}

