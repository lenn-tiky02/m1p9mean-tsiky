import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandeListeEkalyComponent } from './commande-liste-ekaly.component';

describe('CommandeListeEkalyComponent', () => {
  let component: CommandeListeEkalyComponent;
  let fixture: ComponentFixture<CommandeListeEkalyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommandeListeEkalyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommandeListeEkalyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
