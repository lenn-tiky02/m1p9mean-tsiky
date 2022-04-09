import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {DragDropModule} from '@angular/cdk/drag-drop';
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
    SpinnerOverlayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,      
    CommonModule, 
    BrowserAnimationsModule,
    DragDropModule,
    MatProgressSpinnerModule
  ],
  providers: [  
    AuthenticationService, 
    AuthGuardService,
    PlatService,
    SpinnerOverlayService
  ],
  bootstrap: [AppComponent] 
})
export class AppModule { }
