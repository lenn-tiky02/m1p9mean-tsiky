import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { CommandeAddDetails, CommandeReadDetails, CommandeService } from '../services/commande.service';
import { AuthenticationService } from '../services/authentication.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-commande-assignation',
  templateUrl: './commande-assignation.component.html',
  styleUrls: ['./commande-assignation.component.css']
})
export class CommandeAssignationComponent implements OnInit {

  todo: CommandeReadDetails[] = [];
  done : CommandeReadDetails[] = [];
  //commandeReadV : CommandeReadDetails[] = [];
  constructor(private toastr: ToastrService, private commandeService: CommandeService, private auth: AuthenticationService) { }

  ngOnInit(): void {
    this.commandeService.getCommandeByRestaurantAndStatus(this.auth.getUserRoles()[0].roleid, 'validée').subscribe((data : CommandeReadDetails[]) => {
      this.todo = data;   
    });
    this.commandeService.getCommandeByRestaurantAndStatus(this.auth.getUserRoles()[0].roleid, 'traitée').subscribe((data : CommandeReadDetails[]) => {
      this.done = data;   
    });
  }
  
  drop(event: CdkDragDrop<CommandeReadDetails[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      console.log('event.previousContainer.data');
      console.log(event.previousContainer.data[event.previousIndex]);
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      this.changeStatusCommande(event.previousContainer.data[event.previousIndex]._id,'traitée');
    }
  }
  
  changeStatusCommande(idCommande: String | null, status: String): void {  
    this.commandeService.getCommandeById(idCommande).subscribe((data : CommandeAddDetails) => {
      data.statut = status;
      this.commandeService.modifierCommande(data).subscribe((data : CommandeAddDetails) => { console.log('Vita ooo!')});
    });
  }
   /*this.commandeToUpdate.statut = 'validée';
    
    this.commandeService.modifierCommande(this.commandeToUpdate).subscribe((data: any) => {
      let commandeIndex =  this.commandeRead.findIndex(element => element._id === idCommande)!;
      this.commandeRead[commandeIndex].statut = 'validée' ;
      this.toastr.success('Le plat a bien été validée', 'Plat validée!',{
        positionClass: 'toast-bottom-center'
      });
    });*/
}
