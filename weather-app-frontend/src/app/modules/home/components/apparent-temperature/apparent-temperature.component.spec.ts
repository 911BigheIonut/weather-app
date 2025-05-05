import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApparentTemperatureComponent } from './apparent-temperature.component';

describe('ApparentTemperatureComponent', () => {
  let component: ApparentTemperatureComponent;
  let fixture: ComponentFixture<ApparentTemperatureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApparentTemperatureComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ApparentTemperatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
