import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlatManagementComponent } from './plat-management.component';

describe('PlatManagementComponent', () => {
  let component: PlatManagementComponent;
  let fixture: ComponentFixture<PlatManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlatManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlatManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
