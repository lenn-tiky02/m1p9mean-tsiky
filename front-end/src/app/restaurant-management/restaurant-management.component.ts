import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService, TokenPayload } from '../services/authentication.service';
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
  
  credentials: TokenPayload = {
    email: '',
    name: '',
    password: '',
    roles: [{ name: 'Restaurateur', roleid: ''}]
  };

  tabRestaurant : RestaurantDetails[] = [];
  constructor(private toastr: ToastrService, private router: Router, private auth: AuthenticationService, private route: ActivatedRoute, private restaurantService: RestaurantService) { }

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
    this.restaurantService.ajouterRestaurant(this.restaurantVariable).subscribe(data => {
      console.log(data);
      this.credentials.roles[0].roleid = data._id;
      this.credentials.email= this.restaurantVariable.email + '';
      this.credentials.name = this.restaurantVariable.nom + '';
      this.enregistrerUser();     
    });
  }

  modifierRestaurant(id: String | null) {  
    console.log('modifierRestaurant has been called!' + id)    
  }

  supprimerRestaurant(id: String | null){
    console.log('supprimerRestaurant has been called!' + id);
    this.restaurantService.supprimerUserRestaurant(id + '').subscribe(()=>{

      this.restaurantService.supprimerRestaurant(id + '').subscribe(()=>{
        this.toastr.error('Le Restaurant et son compte a bien été supprimé', 'Restaurant supprimé!',{
          positionClass: 'toast-bottom-center'
        }); 
        
        this.reloadCurrentRoute();
      });
     
    });
  }
  
  private enregistrerUser(){
    console.log(this.credentials)
    this.auth.registerOnly(this.credentials).subscribe(() => {   
      this.toastr.success('Le Restaurant a bien été ajouté', 'Restaurant ajouté!',{
        positionClass: 'toast-bottom-center'
      });       
      this.reloadCurrentRoute();
    }, (err) => {
      console.error(err);
    });
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
}
}
