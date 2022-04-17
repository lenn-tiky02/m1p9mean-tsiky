import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { CommandeListeComponent } from './commande-liste/commande-liste.component';
import { PlatManagementComponent } from './plat-management/plat-management.component';
import { RestaurantAdminComponent } from './restaurant-admin/restaurant-admin.component';
import { ProductPlatComponent } from './product-plat/product-plat.component';

import { AuthenticationService } from './services/authentication.service';
import { AuthGuardService } from './services/auth-guard.service';
import { PlatService } from './services/plat.service';
import { SpinnerOverlayService } from './services/spinner-overlay.service';
import { SpinnerOverlayComponent } from './spinner-overlay/spinner-overlay.component';
import { SpinnerInterceptor } from './services/spinner-interceptor';
import { OverlayModule } from '@angular/cdk/overlay';
import { EnvoiMailComponent } from './envoi-mail/envoi-mail.component';
import { MailService } from './services/mail.service';
import { UploadService } from './services/upload.service';

import { AngularFireModule } from "@angular/fire/compat";
import { AngularFireStorageModule, AngularFireStorageReference, AngularFireUploadTask } from "@angular/fire/compat/storage";
import { environment } from 'src/environments/environment';
import { ClientService } from './services/client.service';
import { RestaurantService } from './services/restaurant.service';
import { CommandeAssignationComponent } from './commande-assignation/commande-assignation.component';
import { CommandeService } from './services/commande.service';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    CommandeListeComponent,
    PlatManagementComponent,
    RestaurantAdminComponent,
    ProductPlatComponent,
    SpinnerOverlayComponent,
    EnvoiMailComponent,
    CommandeAssignationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,      
    CommonModule, 
    BrowserAnimationsModule,
    DragDropModule,
    MatProgressSpinnerModule,
    OverlayModule,
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, "cloud"),
    ToastrModule.forRoot({
      progressBar: true
      //positionClass: 'toast-bottom-center'
    //  preventDuplicates : true
    })
  ],
  providers: [  
    AuthenticationService, 
    AuthGuardService,
    PlatService,
    SpinnerOverlayService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: SpinnerInterceptor,
      multi: true,
    },
    MailService,
    UploadService,
    ClientService,
    RestaurantService,
    CommandeService
  ],
  bootstrap: [AppComponent] 
})
export class AppModule { }
