import { Component, OnInit } from '@angular/core';
import { CommandeAddDetails, CommandeReadDetails, CommandeService } from '../services/commande.service';
import { AuthenticationService } from '../services/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';

  
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
  constructor(private toastr: ToastrService, private commandeService: CommandeService, private auth: AuthenticationService, private datepipe: DatePipe) { }

  ngOnInit(): void {
    this.getData(new Date())
  }

  onChangeCalendar(event: any){
    this.dateNow = new Date(event.value); 
    this.benefice = 0;
    this.depense = 0;
    this.chiffreAffaire = 0;
    this.getData(new Date(event.value));
  }

  getData(date: Date){
    this.commandeService.getCommandeByRestaurantAndDateAndStatus(this.auth.getUserRoles()[0].roleid, date, 'livrée').subscribe((data : CommandeReadDetails[]) => {
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
  

