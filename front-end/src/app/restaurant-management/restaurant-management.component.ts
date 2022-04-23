import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { RestaurantDetails, RestaurantService } from '../services/restaurant.service';

@Component({
  selector: 'app-restaurant-management',
  templateUrl: './restaurant-management.component.html',
  styleUrls: ['./restaurant-management.component.css']
})
export class RestaurantManagementComponent implements OnInit {  
  @Input() public varFromWhere: string | undefined; // this is typed as string, but you can use any type you want

  restaurantVariable: RestaurantDetails = {
    nom: '',
    location: '',
    email: '',
    telephone: '',
    _id: null
  };
  tabRestaurant : RestaurantDetails[] = [];
  constructor(private toastr: ToastrService, private auth: AuthenticationService, private route: ActivatedRoute, private restaurantService: RestaurantService) { }

  ngOnInit(): void {
    this.restaurantService.getRestaurants()
    .subscribe((data: RestaurantDetails[])=>{
      console.log(data);
      this.tabRestaurant = data;
    });
    /*this.route.params.subscribe( 
      params => {
      if (params['id']) { 
        this.restaurantService.getRestaurantById(params['id'])
        .subscribe((data: RestaurantDetails)=>{
          console.log(data);
          this.restaurantVariable = data;
        });
      }
    });*/
  }

  enregistrer() { 
    console.log('enregistrer has been called!')
  }

  modifierRestaurant(id: String | null) {  
    console.log('modifierRestaurant has been called!' + id)    
  }

  supprimerRestaurant(id: String | null){
    console.log('supprimerRestaurant has been called!' + id)
  }
}
