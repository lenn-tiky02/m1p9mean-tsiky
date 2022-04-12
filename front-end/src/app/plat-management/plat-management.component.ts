import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PlatDetails, PlatService } from '../services/plat.service';
import { UploadService } from '../services/upload.service';
import { AngularFireStorage} from "@angular/fire/compat/storage";
import { finalize, Observable } from 'rxjs';
import { SpinnerOverlayService } from '../services/spinner-overlay.service';
import { ActivatedRoute, Router } from '@angular/router';

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
    imagePath: null
  }

  status = ["disponible" ,"non disponible"];
  
  selectedFile :  null | undefined | any = null;

  title = "cloudsStorage";
  fb: any;
  downloadURL: Observable<string> | undefined;

  constructor(private router: Router, private route: ActivatedRoute, private platService: PlatService,  private formsModule: FormsModule, private uploadService: UploadService, private storage: AngularFireStorage, private readonly spinnerOverlayService: SpinnerOverlayService) { }

  ngOnInit(): void {
    this.route.params.subscribe( 
      params => {
      if (params['id']) { 
        //this.doSearch(params['term'])
        console.log('******************');
        console.log(params['id']);
        this.platService.getPlatById(params['id'])
        .subscribe((data: PlatDetails)=>{
          console.log(data);
          this.platVariable = data;
        });
      }
    });
  }

  enregistrer() {    
    if(this.selectedFile){
      this.uploadFileAndSave(this.selectedFile);  
    }else{
      this.platService.ajouterPlat(this.platVariable)  
      .subscribe(data => {
        console.log(data);
        window.location.reload();          
      });
    }
      
  }

  modifierPlat() {    
    this.platService.modifierPlat(this.platVariable)  
            .subscribe(data => {
              console.log(data);
              window.location.reload();          
            });
  }

  supprimerPlat(id: String){
    this.platService.supprimerPlat(id)  
    .subscribe(data => {
      console.log(data);
      this.router.navigate(['/restaurantAdmin']);
    });
  }

  onFileSelected(event: any){
    if(event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      this.selectedFile = file;
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
            console.log(this.fb);
            this.platService.ajouterPlat(this.platVariable)  
            .subscribe(data => {
              console.log(data);
              window.location.reload();          
            });
          });
        })
      )
      .subscribe(url => {
        if (url) {
        }
      });
  }
}
