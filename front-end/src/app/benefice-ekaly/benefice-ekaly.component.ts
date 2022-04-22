import { Component, OnInit } from '@angular/core';
import { CommandeAddDetails, CommandeReadDetails, CommandeService } from '../services/commande.service';
import { AuthenticationService } from '../services/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { DatePipe } from '@angular/common';
import { RestaurantDetails, RestaurantService } from '../services/restaurant.service';

  
@Component({
  selector: 'app-benefice-ekaly',
  templateUrl: './benefice-ekaly.component.html',
  styleUrls: ['./benefice-ekaly.component.css']
})
export class BeneficeEkalyComponent implements OnInit {
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
    })
  }

  onChangeCalendar(event: any){
    this.dateNow = new Date(event.value); 
 
    if(this.chosenRestaurant){
      this.benefice = 0;
      this.depense = 0;
      this.chiffreAffaire = 0;
      this.getData(this.chosenRestaurant, new Date(event.value), 'livrée');
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
    this.getData(this.chosenRestaurant, this.dateNow, 'livrée');
  }

  getData(restaurantId: string | null, date: Date, statut: string){
    this.commandeService.getCommandeByRestaurantAndDate(restaurantId, date, statut).subscribe((data : CommandeReadDetails[]) => {
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
  

