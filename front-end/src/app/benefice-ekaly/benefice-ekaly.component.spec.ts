import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeneficeEkalyComponent } from './benefice-ekaly.component';

describe('BeneficeEkalyComponent', () => {
  let component: BeneficeEkalyComponent;
  let fixture: ComponentFixture<BeneficeEkalyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BeneficeEkalyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BeneficeEkalyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
