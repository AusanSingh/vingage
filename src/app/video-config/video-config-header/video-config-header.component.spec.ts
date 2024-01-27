import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoConfigHeaderComponent } from './video-config-header.component';

describe('VideoConfigHeaderComponent', () => {
  let component: VideoConfigHeaderComponent;
  let fixture: ComponentFixture<VideoConfigHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoConfigHeaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoConfigHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
