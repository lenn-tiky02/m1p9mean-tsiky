import { Component } from '@angular/core';
import { RestaurantDetails, RestaurantService } from '../services/restaurant.service';

@Component({
  templateUrl: './home.component.html'
})
export class HomeComponent {
  textVariable: String = '';
  tabResult: RestaurantDetails[] = [];
  constructor(private restaurantService: RestaurantService) { }

  onFileSelected(event: any){
    console.log(event);
    this.getRestaurantByString(this.textVariable);
  }

  getRestaurantByString(text : String){
    this.restaurantService.getRestaurantByTextName(text)  
    .subscribe(data => {
      console.log('attention please');    
      console.log(data);    
      this.tabResult = data;
    });
  }
}
