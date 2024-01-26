import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoContComponent } from './video-cont.component';

describe('VideoContComponent', () => {
  let component: VideoContComponent;
  let fixture: ComponentFixture<VideoContComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoContComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VideoContComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
