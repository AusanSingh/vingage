import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompStyleEffectComponent } from './comp-style-effect.component';

describe('CompStyleEffectComponent', () => {
  let component: CompStyleEffectComponent;
  let fixture: ComponentFixture<CompStyleEffectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompStyleEffectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompStyleEffectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
