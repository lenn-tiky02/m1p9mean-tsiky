import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandeLivreurComponent } from './commande-livreur.component';

describe('CommandeLivreurComponent', () => {
  let component: CommandeLivreurComponent;
  let fixture: ComponentFixture<CommandeLivreurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommandeLivreurComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommandeLivreurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
