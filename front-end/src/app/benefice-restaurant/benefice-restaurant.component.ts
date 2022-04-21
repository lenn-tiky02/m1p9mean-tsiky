import { Component, OnInit } from '@angular/core';
import { CommandeAddDetails, CommandeReadDetails, CommandeService } from '../services/commande.service';
import { AuthenticationService } from '../services/authentication.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-benefice-restaurant',
  templateUrl: './benefice-restaurant.component.html',
  styleUrls: ['./benefice-restaurant.component.css']
})
export class BeneficeRestaurantComponent implements OnInit {
  benefice: Number | null = 0;
  depense: Number | null = 0;
  chiffreAffaire: Number | null = 0;

  dateNow = new Date();

  listeCommande: CommandeReadDetails[] = [];
  //commandeReadV : CommandeReadDetails[] = [];
  constructor(private toastr: ToastrService, private commandeService: CommandeService, private auth: AuthenticationService) { }

  ngOnInit(): void {
    this.commandeService.getCommandeByRestaurantAndDate(this.auth.getUserRoles()[0].roleid, new Date(), 'livrée').subscribe((data : CommandeReadDetails[]) => {
      this.listeCommande = data;   
      console.log('************');
      console.log(data);
      data.forEach(item => 
      {
        this.benefice = Number(this.benefice) + Number(item.totalPrixBenefice);
        this.depense = Number(this.depense) + Number(item.totalPrixDeRevient);
        this.chiffreAffaire = Number(this.chiffreAffaire) + Number(item.totalPrixDeVente);
      });
    });
  }
}
  

