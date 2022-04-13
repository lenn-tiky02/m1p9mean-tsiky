import { Component, OnInit } from '@angular/core';
import { RoleGuardGuard } from '../services/guards/role-guard.guard';
import { PlatDetails, PlatService } from '../services/plat.service';

@Component({
  selector: 'app-product-plat',
  templateUrl: './product-plat.component.html',
  styleUrls: ['./product-plat.component.css']
})
export class ProductPlatComponent implements OnInit {

  platListe : PlatDetails[]= [{
    _id: '',
    nom: '',
    description: '',
    prixDeVente: {
      $numberDecimal: 0
    },
    prixDeRevient:  {
      $numberDecimal: 0
    },
    statutDisponibilite: '',
    imagePath: '',
    fileName: '',
    restaurantId: ''
  }]
  constructor(private plat: PlatService, public role: RoleGuardGuard) { }

  ngOnInit(): void {    
   this.plat.getPlats().subscribe((data: any[])=>{
      console.log(data);
      this.platListe = data;
    });
  }

}
