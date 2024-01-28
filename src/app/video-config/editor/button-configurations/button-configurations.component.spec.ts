import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonConfigurationsComponent } from './button-configurations.component';

describe('ButtonConfigurationsComponent', () => {
  let component: ButtonConfigurationsComponent;
  let fixture: ComponentFixture<ButtonConfigurationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonConfigurationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonConfigurationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
