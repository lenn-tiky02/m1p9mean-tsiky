import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { CommandeAddDetails, CommandeReadDetails, CommandeService } from '../services/commande.service';
import { AuthenticationService } from '../services/authentication.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-commande-restaurant',
  templateUrl: './commande-restaurant.component.html',
  styleUrls: ['./commande-restaurant.component.css']
})
export class CommandeRestaurantComponent implements OnInit {

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
      let idCom = event.previousContainer.data[event.previousIndex]._id;
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      this.changeStatusCommande(idCom,'traitée');
    }
  }
  
  changeStatusCommande(idCommande: String | null, status: String): void {  
    this.commandeService.getCommandeById(idCommande).subscribe((data : CommandeAddDetails) => {
      data.statut = status;
      this.commandeService.modifierCommande(data).subscribe((data : CommandeAddDetails) => { console.log('Vita ooo!')});
    });
  }
}
