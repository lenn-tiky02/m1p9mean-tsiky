import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeneficeRestaurantComponent } from './benefice-restaurant.component';

describe('BeneficeRestaurantComponent', () => {
  let component: BeneficeRestaurantComponent;
  let fixture: ComponentFixture<BeneficeRestaurantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeneficeRestaurantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BeneficeRestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
