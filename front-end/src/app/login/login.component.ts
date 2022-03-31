import { Component } from '@angular/core';import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthenticationService, TokenPayload } from '../services/authentication.service';


@Component({
  templateUrl: './login.component.html'
})
export class LoginComponent {
  credentials: TokenPayload = {
    email: '',
    password: ''
  };

  constructor(private auth: AuthenticationService, private router: Router, private formsModule: FormsModule) {}

  login() {    
    console.log(this.credentials)
    this.auth.login(this.credentials).subscribe(() => {
      this.router.navigateByUrl('/profile');
    }, (err) => {
      console.error(err);
    }); 
  }
}
