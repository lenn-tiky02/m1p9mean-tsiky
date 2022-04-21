import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthenticationService, TokenPayload } from '../services/authentication.service';


@Component({
  selector: 'bloc-login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  credentials: TokenPayload = {
    email: '',
    password: '',
    roles: []
  };

  constructor(private auth: AuthenticationService, private router: Router, private formsModule: FormsModule) {}

  login() {    
    this.auth.login(this.credentials).subscribe(() => {
      if(this.auth.getUserRoles()[0].name === 'Restaurateur'){
        this.router.navigateByUrl('/restaurantAdmin');
      }else if(this.auth.getUserRoles()[0].name === 'Client'){
        this.router.navigateByUrl('/');
      }else if(this.auth.getUserRoles()[0].name === 'Livreur'){
        this.router.navigateByUrl('/commandeLivreur');
      }
      
    }, (err) => {
      console.error(err);
    }); 
  }
}
