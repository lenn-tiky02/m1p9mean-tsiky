import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { CommandeAddDetails, CommandeService } from '../services/commande.service';
import { RoleGuardGuard } from '../services/guards/role-guard.guard';
import { PlatDetails, PlatService } from '../services/plat.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-plat',
  templateUrl: './product-plat.component.html',
  styleUrls: ['./product-plat.component.css']
})
export class ProductPlatComponent implements OnInit {
  public commandeVariable: CommandeAddDetails = {
    _id: null,
    idClient: null,
    listePlats: new Array(),
    idRestaurant: null,
    statut: '',
    dateCommande: null,
    dateLivraison: null,
    idLivreur: null
  };

  platListe : PlatDetails[]= [];
  nbPlat : number = 0;

  constructor(private toastr: ToastrService,private commande: CommandeService, private plat: PlatService, public role: RoleGuardGuard, public auth: AuthenticationService, private route: ActivatedRoute) { }

  ngOnInit(): void {    
     this.route.params.subscribe( 
      params => {
      if (params['idRestaurant'] && this.auth.getUserRoles()[0].name === 'Client') { 
        this.plat.getPlatByRestaurant(params['idRestaurant'])
        .subscribe((data: PlatDetails[])=>{
          console.log(data);
          this.platListe = data;
          this.commandeVariable.idRestaurant = params['idRestaurant'];
          this.commandeVariable.idClient = this.auth.getUserRoles()[0].roleid;
        });
      }else if(this.auth.getUserRoles()[0].name === 'Restaurateur'){
        this.plat.getPlatByRestaurant(this.auth.getUserRoles()[0].roleid).subscribe((data: any[])=>{
          console.log(data);
          this.platListe = data;
        });
      }else{
        this.plat.getPlats().subscribe((data: any[])=>{
          console.log(data);
          this.platListe = data;
        });
      }
    });
  }

  CreateOrAddCommand(id: string | null){
    if(!this.commandeVariable.idRestaurant){      
      this.toastr.error('Revenez à l\'accueil et choisissez un restaurant pour créer une commande', 'Aucun restaurant choisie!');

    }else{
      //  this.commandeVariable._id = id;  
      let listeTemp = this.commandeVariable.listePlats;
      listeTemp.push(id + '');
      this.commandeVariable.listePlats = listeTemp;
      this.nbPlat = this.commandeVariable.listePlats.length;
      if(!this.commandeVariable._id){
        console.log('ajout');
        this.commandeVariable.statut = 'brouillon';
        this.commandeVariable.dateCommande = new Date();//.transform(this.myDate, 'yyyy-MM-dd');
        this.commande.ajouterCommande(this.commandeVariable).subscribe((data : CommandeAddDetails) => {
          this.commandeVariable = data;
          this.toastr.success('Votre commande a bien été créer', 'Commande créée!',{
            positionClass: 'toast-bottom-center'
          });
        });

      }else{
        
        console.log('update');
        this.commande.modifierCommande(this.commandeVariable).subscribe((data : CommandeAddDetails) => {
          this.commandeVariable = data;
          this.toastr.success('Votre plat a bien été ajouté à la commande', 'Plat ajouté!',{
            positionClass: 'toast-bottom-center'
          });
        },(err) => {
          console.error(err);
        });
      }
    }   
  }
}
