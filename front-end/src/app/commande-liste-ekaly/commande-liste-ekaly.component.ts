import {Component, Input, OnInit} from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { CommandeReadDetails, CommandeService } from '../services/commande.service';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { RestaurantDetails, RestaurantService } from '../services/restaurant.service';

@Component({
  selector: 'app-commande-liste-ekaly',
  templateUrl: './commande-liste-ekaly.component.html',
  styleUrls: ['./commande-liste-ekaly.component.css']
})
export class CommandeListeEkalyComponent implements OnInit {
  benefice: Number | null = 0;
  depense: Number | null = 0;
  chiffreAffaire: Number | null = 0;

  dateNow = new Date();

  chosenRestaurant: string | null = null;
  listeCommande: CommandeReadDetails[] = [];
  listeRestaurant: RestaurantDetails[] = [];
  //commandeReadV : CommandeReadDetails[] = [];
  constructor(private toastr: ToastrService, private restaurantService: RestaurantService,private commandeService: CommandeService, private auth: AuthenticationService, private datepipe: DatePipe) { }

  ngOnInit(): void {
    this.restaurantService.getRestaurants().subscribe(data => {
      this.chosenRestaurant = data[0]._id + '';
      this.listeRestaurant = data;
      this.getData(this.chosenRestaurant, this.dateNow);
    })
  }

  onChangeCalendar(event: any){
    this.dateNow = new Date(event.value); 
 
    if(this.chosenRestaurant){
      this.benefice = 0;
      this.depense = 0;
      this.chiffreAffaire = 0;
      this.getData(this.chosenRestaurant, new Date(event.value));
    }else{
      this.toastr.info('Veuillez choisir un restaurant', 'Choisir un restaurant!',{
        positionClass: 'toast-bottom-center'
      });
    }
  }

  onChangeRestaurant(){
    this.benefice = 0;
    this.depense = 0;
    this.chiffreAffaire = 0;
    this.getData(this.chosenRestaurant, this.dateNow);
  }

  getData(restaurantId: string | null, date: Date){
    this.commandeService.getCommandeByRestaurantAndDate(restaurantId, date).subscribe((data : CommandeReadDetails[]) => {
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
