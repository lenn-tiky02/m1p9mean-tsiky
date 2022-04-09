import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPlatComponent } from './product-plat.component';

describe('ProductPlatComponent', () => {
  let component: ProductPlatComponent;
  let fixture: ComponentFixture<ProductPlatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductPlatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductPlatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
