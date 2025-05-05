import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrecipitationProbabilityComponent } from './precipitation-probability.component';

describe('PrecipitationProbabilityComponent', () => {
  let component: PrecipitationProbabilityComponent;
  let fixture: ComponentFixture<PrecipitationProbabilityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrecipitationProbabilityComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PrecipitationProbabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
