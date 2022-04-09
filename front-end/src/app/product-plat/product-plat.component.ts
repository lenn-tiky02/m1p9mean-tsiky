import { Component, OnInit } from '@angular/core';
import { PlatDetails, PlatService } from '../services/plat.service';

@Component({
  selector: 'app-product-plat',
  templateUrl: './product-plat.component.html',
  styleUrls: ['./product-plat.component.css']
})
export class ProductPlatComponent implements OnInit {
  platListe : PlatDetails[]= [{
    nom: 'test',
    description: '',
    prixDeVente: 0,
    prixDeRevien: 0,
    statutDisponibilite: '',
    imagePath: '',
  }]
  constructor(private plat: PlatService) { }

  ngOnInit(): void {
   this.plat.getPlats().subscribe((data: any[])=>{
      console.log(data);
      this.platListe = data;
    });
  }

}
