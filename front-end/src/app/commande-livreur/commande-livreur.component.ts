import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { CommandeAddDetails, CommandeReadDetails, CommandeService } from '../services/commande.service';
import { AuthenticationService } from '../services/authentication.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-commande-livreur',
  templateUrl: './commande-livreur.component.html',
  styleUrls: ['./commande-livreur.component.css']
})
export class CommandeLivreurComponent implements OnInit {

  todo: CommandeReadDetails[] = [];
  done : CommandeReadDetails[] = [];
  //commandeReadV : CommandeReadDetails[] = [];
  constructor(private toastr: ToastrService, private commandeService: CommandeService, private auth: AuthenticationService) { }

  ngOnInit(): void {
    this.commandeService.getCommandeByStatus('traitée').subscribe((data : CommandeReadDetails[]) => {
      this.todo = data;   
    });
    this.commandeService.getCommandeByLivreur(this.auth.getUserRoles()[0].roleid).subscribe((data : CommandeReadDetails[]) => {
      this.done = data;   
    });
  }
  
  drop(event: CdkDragDrop<CommandeReadDetails[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      
      let idCom = event.previousContainer.data[event.previousIndex]._id;
      console.log(event.previousContainer.data[event.previousIndex]);
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      this.changeStatusCommande(idCom,'livrée');
    }
  }
  
  changeStatusCommande(idCommande: String | null, status: String): void {  
    this.commandeService.getCommandeById(idCommande).subscribe((data : CommandeAddDetails) => {
      data.statut = status;
      data.idLivreur = this.auth.getUserRoles()[0].roleid;
      data.dateLivraison = new Date();
      this.commandeService.modifierCommande(data).subscribe((data : CommandeAddDetails) => { console.log('Done')});
    });
  }
}
