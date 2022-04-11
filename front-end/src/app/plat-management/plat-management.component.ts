import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PlatDetails, PlatService } from '../services/plat.service';
import { UploadService } from '../services/upload.service';
import { AngularFireStorage} from "@angular/fire/compat/storage";
import { finalize, Observable } from 'rxjs';
import { SpinnerOverlayService } from '../services/spinner-overlay.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-plat-management',
  templateUrl: './plat-management.component.html',
  styleUrls: ['./plat-management.component.css']
})
export class PlatManagementComponent implements OnInit {
  
  platVariable : PlatDetails= {  
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
  }

  status = ["disponible" ,"non disponible"];
  
  selectedFile :  null | undefined | any = null;

  title = "cloudsStorage";
  fb: any;
  downloadURL: Observable<string> | undefined;

  constructor(private router: Router, private platService: PlatService,  private formsModule: FormsModule, private uploadService: UploadService, private storage: AngularFireStorage, private readonly spinnerOverlayService: SpinnerOverlayService) { }

  ngOnInit(): void {
  }

  enregistrer() {    
    this.uploadFile(this.selectedFile);

    
  }

  onFileSelected(event: any){
    if(event.target.files && event.target.files.length) {
      const file = event.target.files[0];
      this.selectedFile = file;
    }
  }

  uploadFile(file: File){
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
         // console.log(url); //progress
        }
      });
  }
}
