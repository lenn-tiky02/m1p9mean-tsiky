import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandeAssignationComponent } from './commande-assignation.component';

describe('CommandeAssignationComponent', () => {
  let component: CommandeAssignationComponent;
  let fixture: ComponentFixture<CommandeAssignationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommandeAssignationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommandeAssignationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
