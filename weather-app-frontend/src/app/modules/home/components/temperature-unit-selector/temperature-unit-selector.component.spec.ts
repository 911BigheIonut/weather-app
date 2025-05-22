import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TemperatureUnitSelectorComponent } from './temperature-unit-selector.component';

describe('TemperatureUnitSelectorComponent', () => {
  let component: TemperatureUnitSelectorComponent;
  let fixture: ComponentFixture<TemperatureUnitSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TemperatureUnitSelectorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TemperatureUnitSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
