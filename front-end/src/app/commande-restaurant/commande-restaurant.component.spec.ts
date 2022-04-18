import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandeRestaurantComponent } from './commande-restaurant.component';

describe('CommandeRestaurantComponent', () => {
  let component: CommandeRestaurantComponent;
  let fixture: ComponentFixture<CommandeRestaurantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommandeRestaurantComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommandeRestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
