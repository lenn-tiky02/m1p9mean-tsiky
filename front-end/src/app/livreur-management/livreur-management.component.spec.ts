import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivreurManagementComponent } from './livreur-management.component';

describe('LivreurManagementComponent', () => {
  let component: LivreurManagementComponent;
  let fixture: ComponentFixture<LivreurManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LivreurManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LivreurManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
