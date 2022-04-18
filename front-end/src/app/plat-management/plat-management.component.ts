import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PlatDetails, PlatService } from '../services/plat.service';
import { UploadService } from '../services/upload.service';
import { AngularFireStorage} from "@angular/fire/compat/storage";
import { finalize, Observable } from 'rxjs';
import { SpinnerOverlayService } from '../services/spinner-overlay.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-plat-management',
  templateUrl: './plat-management.component.html',
  styleUrls: ['./plat-management.component.css']
})
export class PlatManagementComponent implements OnInit {  
  @Input() public varFromWhere: string | undefined; // this is typed as string, but you can use any type you want

  platVariable : PlatDetails= {  
    _id: null,
    nom: '',
    description: '',
    prixDeVente:  {
      $numberDecimal: 0
    },
    prixDeRevient:  {
      $numberDecimal: 0
    },
    statutDisponibilite: '',
    imagePath: '',
    fileName: '',
    restaurantId: ''
  }

  status = ["disponible" ,"non disponible"];
  
  selectedFile :  null | undefined | any = null;

  title = "cloudsStorage";
  fb: any;
  downloadURL: Observable<string> | undefined;

  constructor(private toastr: ToastrService, private auth: AuthenticationService, private router: Router, private route: ActivatedRoute, private platService: PlatService,  private formsModule: FormsModule, private uploadService: UploadService, private storage: AngularFireStorage, private readonly spinnerOverlayService: SpinnerOverlayService) { }

  ngOnInit(): void {
    this.route.params.subscribe( 
      params => {
      if (params['id']) { 
        this.platService.getPlatById(params['id'])
        .subscribe((data: PlatDetails)=>{
          console.log(data);
          this.platVariable = data;
        });
      }
    });
  }

  enregistrer() {    
    this.platVariable.restaurantId = this.auth.getUserRoles()[0].roleid;
    if(this.selectedFile){
      this.uploadFileAndSave(this.selectedFile);  
    }else{
      this.platService.ajouterPlat(this.platVariable)  
      .subscribe(data => {
        this.toastr.success('Le plat a bien été ajouté', 'Plat ajouté!',{
          positionClass: 'toast-bottom-center'
        });       
        this.reloadCurrentRoute();
      });
    }
      
  }

  modifierPlat() {    
    this.platVariable.restaurantId = this.auth.getUserRoles()[0].roleid;
    if(this.selectedFile){
      this.uploadFileAndUpdate(this.selectedFile);  
    }else{
      this.platService.modifierPlat(this.platVariable)  
      .subscribe(data => {
        this.toastr.success('Le plat a bien été modifié', 'Plat modifié!',{
          positionClass: 'toast-bottom-center'
        });
        this.reloadCurrentRoute();
      });
    }
  }

  supprimerPlat(id: String){
    this.platService.supprimerPlat(id)  
    .subscribe(data => {
      console.log(data);
      this.router.navigate(['/restaurantAdmin']);
      this.toastr.success('Le plat a bien été supprimé', 'Plat supprimé!',{
        positionClass: 'toast-bottom-center'
      });     
    });
  }

  onFileSelected(event: any){
    if(event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      this.selectedFile = file;
      this.platVariable.fileName = file.name;
    }
  }

  uploadFileAndSave(file: File){
    this.spinnerOverlayService.show();
    var n = Date.now();
    const filePath = `PlatsImages/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`PlatsImages/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe((url: any) => {
            if (url) {
              this.fb = url;
            }
            this.platVariable.imagePath = this.fb;
            this.spinnerOverlayService.hide();

            this.platService.ajouterPlat(this.platVariable)  
            .subscribe(data => {
              this.toastr.success('Le plat a bien été ajouté', 'Plat ajouté!',{
                positionClass: 'toast-bottom-center'
              });  
              this.reloadCurrentRoute();
            });
          });
        })
      )
      .subscribe(url => {
        if (url) {
        }
      });
  }

  
  uploadFileAndUpdate(file: File){
    this.spinnerOverlayService.show();
    var n = Date.now();
    const filePath = `PlatsImages/${n}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(`PlatsImages/${n}`, file);
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
          this.downloadURL.subscribe((url: any) => {
            if (url) {
              this.fb = url;
            }
            this.platVariable.imagePath = this.fb;
            this.spinnerOverlayService.hide();
            
            this.platService.modifierPlat(this.platVariable)  
            .subscribe(data => {       
              this.toastr.success('Le plat a bien été ajouté', 'Plat ajouté!',{
                positionClass: 'toast-bottom-center'
              });         
              this.reloadCurrentRoute();
            });
          });
        })
      )
      .subscribe(url => {
        if (url) {
        }
      });
  }

  reloadCurrentRoute() {
    let currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([currentUrl]);
    });
}
}
