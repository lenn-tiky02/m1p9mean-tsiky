import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { RoleGuardGuard } from '../services/guards/role-guard.guard';
import { PlatDetails, PlatService } from '../services/plat.service';

@Component({
  selector: 'app-product-plat',
  templateUrl: './product-plat.component.html',
  styleUrls: ['./product-plat.component.css']
})
export class ProductPlatComponent implements OnInit {

  platListe : PlatDetails[]= [];

  constructor(private plat: PlatService, public role: RoleGuardGuard, public auth: AuthenticationService, private route: ActivatedRoute) { }

  ngOnInit(): void {    
     this.route.params.subscribe( 
      params => {
      if (params['idRestaurant']) { 
        this.plat.getPlatByRestaurant(params['idRestaurant'])
        .subscribe((data: PlatDetails[])=>{
          console.log(data);
          this.platListe = data;
        });

      }else if(this.auth.getUserRoles()[0].name === 'Restaurateur'){
        this.plat.getPlatByRestaurant(this.auth.getUserRoles()[0].roleid).subscribe((data: any[])=>{
          console.log(data);
          this.platListe = data;
        });

      }else{
        this.plat.getPlats().subscribe((data: any[])=>{
          console.log(data);
          this.platListe = data;
        });

      }
     
    });
   
  }

  CreateOrAddCommand(id: string | null){

  }
}
