import {Component, Input, OnInit} from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { CommandeAddDetails, CommandeReadDetails, CommandeService } from '../services/commande.service';

@Component({
  selector: 'app-commande-liste',
  templateUrl: './commande-liste.component.html',
  styleUrls: ['./commande-liste.component.css']
})
export class CommandeListeComponent implements OnInit {
  //@Input('commande')
  commande: CommandeAddDetails = {
    _id: null,
    idClient: null,
    listePlats: [],
    idRestaurant: null,
    statut: '',
    dateCommande: null,
    dateLivraison: null
  };

  commandeRead : CommandeReadDetails[] = [];
  
  constructor(private commandeService: CommandeService, private auth: AuthenticationService) { }
/*
  ngDoCheck(): void{
    if(this.commande._id){

      this.commandeService.getCommandeById(this.commande._id+'').subscribe((data) => {
        this.commandeRead = data; 
        console.log('Efa ato eeee :');
        console.log(data);
      })
    }  
  }
*/
  ngOnInit(): void {
    let role = this.auth.getUserRoles()[0];
    if(role.name === 'Client'){
      this.commandeService.getCommandeByClient(role.roleid).subscribe((data) =>{

        this.commandeRead = data;
      });
    }else if(role.name === 'Restaurateur'){
    //  this.commandeService.getCommandeByRestaurant(role.roleid);
    }
    
  }

}
