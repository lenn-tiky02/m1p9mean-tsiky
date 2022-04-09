import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PlatDetails, PlatService } from '../services/plat.service';

@Component({
  selector: 'app-plat-management',
  templateUrl: './plat-management.component.html',
  styleUrls: ['./plat-management.component.css']
})
export class PlatManagementComponent implements OnInit {
 platVariable : PlatDetails= {  
   nom: '',
   description: '',
   prixDeVente: 0,
   prixDeRevien: 0,
   statutDisponibilite: '',
   imagePath: '',
 }

 status = ["disponible" ,"non disponible"];
  constructor(private platService: PlatService,  private formsModule: FormsModule) { }

  ngOnInit(): void {
  }

  enregistrer() {    
    console.log(this.platVariable);
    this.platService.ajouterPlat(this.platVariable)
  }
}
