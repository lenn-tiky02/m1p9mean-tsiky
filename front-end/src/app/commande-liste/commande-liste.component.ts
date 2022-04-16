import {Component, Input, OnInit} from '@angular/core';
import { CommandeAddDetails, CommandeReadDetails, CommandeService } from '../services/commande.service';

@Component({
  selector: 'app-commande-liste',
  templateUrl: './commande-liste.component.html',
  styleUrls: ['./commande-liste.component.css']
})
export class CommandeListeComponent implements OnInit {

  @Input('commande') commande: CommandeAddDetails = {
    _id: null,
    idClient: null,
    listePlats: [],
    idRestaurant: null,
    statut: '',
    dateCommande: null,
    dateLivraison: null
  };

  commandeRead : CommandeReadDetails = {
    _id: null,
    idClient: null,
    listePlats: [],
    idRestaurant: null,
    statut: '',
    dateCommande: null,
    dateLivraison: null
  }
  
  constructor(private commandeService: CommandeService) { }

  ngDoCheck(): void{
    if(this.commande._id){

      this.commandeService.getCommandeById(this.commande._id+'').subscribe((data) => {
        this.commandeRead = data; 
        console.log('Efa ato eeee :');
        console.log(data);
      })
    }  
  }
  
  ngOnInit(): void {
  }

}
