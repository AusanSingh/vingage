import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TextConfigurationsComponent } from './text-configurations.component';

describe('TextConfigurationsComponent', () => {
  let component: TextConfigurationsComponent;
  let fixture: ComponentFixture<TextConfigurationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TextConfigurationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TextConfigurationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
