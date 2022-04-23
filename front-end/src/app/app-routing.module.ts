import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { AuthGuardService } from './services/auth-guard.service';
import { RoleGuardGuard } from './services/guards/role-guard.guard';
import { CommandeListeComponent } from './commande-liste/commande-liste.component';
import { RestaurantAdminComponent } from './restaurant-admin/restaurant-admin.component';
import { PlatManagementComponent } from './plat-management/plat-management.component';
import { ProductPlatComponent } from './product-plat/product-plat.component';
import { EnvoiMailComponent } from './envoi-mail/envoi-mail.component';
import { CommandeLivreurComponent } from './commande-livreur/commande-livreur.component';
import { CommandeRestaurantComponent } from './commande-restaurant/commande-restaurant.component';
import { BeneficeEkalyComponent } from './benefice-ekaly/benefice-ekaly.component';
import { BeneficeRestaurantComponent } from './benefice-restaurant/benefice-restaurant.component';
import { CommandeListeEkalyComponent } from './commande-liste-ekaly/commande-liste-ekaly.component';
import { RestaurantManagementComponent } from './restaurant-management/restaurant-management.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuardService, RoleGuardGuard], data: { expectedRoles: ['Client']}},
  { path: 'productPlat', component: ProductPlatComponent, canActivate: [AuthGuardService, RoleGuardGuard], data: { expectedRoles: ['Client']}},
  { path: 'productPlat/:idRestaurant', component: ProductPlatComponent, canActivate: [AuthGuardService, RoleGuardGuard], data: { expectedRoles: ['Client']}},
  { path: 'restaurantAdmin', component: RestaurantAdminComponent, canActivate: [AuthGuardService, RoleGuardGuard], data: { expectedRoles: ['Restaurateur']}},
  { path: 'platManagement/:id', component: PlatManagementComponent, canActivate: [AuthGuardService, RoleGuardGuard], data: { expectedRoles: ['Restaurateur']}},
  { path: 'platManagement', component: PlatManagementComponent, canActivate: [AuthGuardService, RoleGuardGuard], data: { expectedRoles: ['Restaurateur']}},
  { path: 'envoieMail', component: EnvoiMailComponent, canActivate: [AuthGuardService, RoleGuardGuard], data: { expectedRoles: ['Restaurateur','Ekaly']}},
  { path: 'commandes', component: CommandeListeComponent, canActivate: [AuthGuardService, RoleGuardGuard], data: { expectedRoles: ['Client']}},
  { path: 'commandeManagement', component: CommandeRestaurantComponent, canActivate: [AuthGuardService, RoleGuardGuard], data: { expectedRoles: ['Restaurateur']}},
  { path: 'beneficeRestaurant', component: BeneficeRestaurantComponent, canActivate: [AuthGuardService, RoleGuardGuard], data: { expectedRoles: ['Restaurateur']}},
  { path: 'beneficeEkaly', component: BeneficeEkalyComponent, canActivate: [AuthGuardService, RoleGuardGuard], data: { expectedRoles: ['Ekaly']}},
  { path: 'commandeLivreur', component: CommandeLivreurComponent, canActivate: [AuthGuardService, RoleGuardGuard], data: { expectedRoles: ['Livreur']}},
  { path: 'commandeEkaly', component: CommandeListeEkalyComponent, canActivate: [AuthGuardService, RoleGuardGuard], data: { expectedRoles: ['Ekaly']}} ,
  { path: 'restaurantManagement', component: RestaurantManagementComponent, canActivate: [AuthGuardService, RoleGuardGuard], data: { expectedRoles: ['Ekaly']}}  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
