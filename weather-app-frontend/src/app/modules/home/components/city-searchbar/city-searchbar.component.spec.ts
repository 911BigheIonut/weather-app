import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitySearchbarComponent } from './city-searchbar.component';

describe('CitySearchbarComponent', () => {
  let component: CitySearchbarComponent;
  let fixture: ComponentFixture<CitySearchbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CitySearchbarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CitySearchbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
