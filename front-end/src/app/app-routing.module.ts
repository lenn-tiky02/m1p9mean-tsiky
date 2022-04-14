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
  { path: 'commandes', component: CommandeListeComponent, canActivate: [AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
