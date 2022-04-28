import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService, TokenPayload } from '../services/authentication.service';
import { ToastrService } from 'ngx-toastr';
import { LivreurDetails, LivreurService } from '../services/livreur.service';

@Component({
  selector: 'app-livreur-management',
  templateUrl: './livreur-management.component.html',
  styleUrls: ['./livreur-management.component.css']
})
export class LivreurManagementComponent implements OnInit {  
  //@Input() public varFromWhere: string | undefined; // this is typed as string, but you can use any type you want

  livreurVariable: LivreurDetails = {
    _id       : '',
    nom       : '',
    prenom  : '',
    telephone : '',
    email     : '',
    zoneId     : ''
  };
  
  credentials: TokenPayload = {
    email: '',
    name: '',
    password: '',
    roles: [{ name: 'Livreur', roleid: ''}]
  };

  tabLivreur : LivreurDetails[] = [];
  constructor(private toastr: ToastrService, private router: Router, private auth: AuthenticationService, private route: ActivatedRoute, private livreurService: LivreurService) { }

  ngOnInit(): void {
    this.livreurService.getLivreurs()
    .subscribe((data: LivreurDetails[])=>{
      console.log(data);
      this.tabLivreur = data;
    });
    /*this.route.params.subscribe( 
      params => {
      if (params['id']) { 
        this.LivreurService.getLivreurById(params['id'])
        .subscribe((data: LivreurDetails)=>{
          console.log(data);
          this.LivreurVariable = data;
        });
      }
    });*/
  }

  enregistrer() { 
    console.log('enregistrer has been called!')
    this.livreurService.ajouterLivreur(this.livreurVariable).subscribe(data => {
      console.log(data);
      this.credentials.roles[0].roleid = data._id;
      this.credentials.email= this.livreurVariable.email + '';
      this.credentials.name = this.livreurVariable.nom + '';
      this.enregistrerUser();     
    });
  }

  modifierLivreur(id: String | null) {  
    console.log('modifierLivreur has been called!' + id)    
  }

  supprimerLivreur(id: String | null){
    console.log('supprimerLivreur has been called!' + id);
    this.livreurService.supprimerUserLivreur(id + '').subscribe(()=>{

      this.livreurService.supprimerLivreur(id + '').subscribe(()=>{
        this.toastr.error('Le Livreur et son compte a bien été supprimé', 'Livreur supprimé!',{
          positionClass: 'toast-bottom-center'
        }); 
        
        this.reloadCurrentRoute();
      });
     
    });
  }
  
  private enregistrerUser(){
    console.log(this.credentials)
    this.auth.registerOnly(this.credentials).subscribe(() => {   
      this.toastr.success('Le Livreur a bien été ajouté', 'Livreur ajouté!',{
        positionClass: 'toast-bottom-center'
      });       
      this.reloadCurrentRoute();
    }, (err) => {
      console.error(err);
    });
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
}
}
