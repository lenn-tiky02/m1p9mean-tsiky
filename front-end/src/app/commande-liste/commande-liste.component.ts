import {Component, Input, OnInit} from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { CommandeAddDetails, CommandeReadDetails, CommandeService } from '../services/commande.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-commande-liste',
  templateUrl: './commande-liste.component.html',
  styleUrls: ['./commande-liste.component.css']
})
export class CommandeListeComponent implements OnInit {
  //@Input('commande')
  commandeToUpdate: CommandeAddDetails = {
    _id: null,
    idClient: null,
    listePlats: [],
    idRestaurant: null,
    statut: '',
    dateCommande: null,
    dateLivraison: null
  };

  commandeRead : CommandeReadDetails[] = [];
  
  boolTest: Boolean = false;
  constructor(private toastr: ToastrService, private commandeService: CommandeService, private auth: AuthenticationService) { }
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

  onSupressCommande(idPlat: String | null, idCommande: String | null): void {
    console.log('idPlat = ' + idPlat);
    console.log('idCommande = ' + idCommande);
    let commandeIndex =  this.commandeRead.findIndex(element => element._id === idCommande)!;
    let platIndex = this.commandeRead[commandeIndex].listePlats?.findIndex(element => element._id === idPlat)!;
    if (platIndex > -1) {
      this.commandeRead[commandeIndex].listePlats?.splice(platIndex, 1);
   }
    this.commandeService.getCommandeById(idCommande).subscribe((data : CommandeAddDetails) => {
      this.commandeToUpdate = data;
      this.commandeToUpdate.listePlats = this.commandeRead[commandeIndex].listePlats?.map(({ _id }) => _id) as String[];
      
      this.commandeService.modifierCommande(this.commandeToUpdate).subscribe((data: any) => {
        this.toastr.success('Votre commande a bien été supprimée', 'Commande créée!',{
          positionClass: 'toast-bottom-center'
        });
      });
    });
  }

}
