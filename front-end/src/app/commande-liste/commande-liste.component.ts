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
    dateLivraison: null,
    idLivreur: null
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

  deletePlatCommande(idPlat: String | null, idCommande: String | null): void {
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
        this.toastr.success('Le plat a bien été supprimée', 'Plat supprimée!',{
          positionClass: 'toast-bottom-center'
        });
      });
    });
  }

  deleteCommande(idCommande: String | null): void {    
    this.commandeService.supprimerCommande(idCommande).subscribe((data : CommandeAddDetails) => {    
      let commandeIndex =  this.commandeRead.findIndex(element => element._id === idCommande)!;
      this.commandeRead.splice(commandeIndex, 1);
      this.toastr.success('la commande a bien été supprimée', 'Commande supprimée!',{
        positionClass: 'toast-bottom-center'
      });
    
    });
  }

  validateCommande(idCommande: String | null): void {  
    this.commandeService.getCommandeById(idCommande).subscribe((data : CommandeAddDetails) => {
      this.commandeToUpdate = data;
      this.commandeToUpdate.statut = 'validée';
      
      this.commandeService.modifierCommande(this.commandeToUpdate).subscribe((data: any) => {
        let commandeIndex =  this.commandeRead.findIndex(element => element._id === idCommande)!;
        this.commandeRead[commandeIndex].statut = 'validée' ;
        this.toastr.success('Le plat a bien été validée', 'Plat validée!',{
          positionClass: 'toast-bottom-center'
        });
      });
    });
  }
}
