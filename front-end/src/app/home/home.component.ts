import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { RestaurantDetails, RestaurantService } from '../services/restaurant.service';

@Component({
  templateUrl: './home.component.html'
})
export class HomeComponent {
  textVariable: String = '';
  tabResult: RestaurantDetails[] = [];
  constructor(private restaurantService: RestaurantService, public auth: AuthenticationService) { }

  onFileSelected(event: any){
    console.log(event);
    this.getRestaurantByString(this.textVariable);
  }

  getRestaurantByString(text : String){
    this.restaurantService.getRestaurantByTextName(text)  
    .subscribe(data => {
      this.tabResult = data;
    });
  }
}
