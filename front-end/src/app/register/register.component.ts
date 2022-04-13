import { Component } from '@angular/core';
import { AuthenticationService, TokenPayload } from '../services/authentication.service';
import { Router } from '@angular/router';
import { ClientDetails, ClientService } from '../services/client.service';

@Component({
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  credentials: TokenPayload = {
    email: '',
    name: '',
    password: '',
    roles: [{ name: 'Client', roleid: ''}]
  };

  client: ClientDetails = {
    _id: null,
    adresseLivraison: '',
    email: '',
    telephone: '',
    location: '',
    zoneId: ''
  }
  constructor(private auth: AuthenticationService, private clientSrv: ClientService, private router: Router) {}

  register() {   
    this.enregistrerClientAndUser();      
  }

  private enregistrerClientAndUser(){
    console.log('awesome project');
    this.client.email = this.credentials.email;
    console.log(this.client);
    this.clientSrv.ajouterClient(this.client).subscribe((data: ClientDetails) => {
      console.log(data);
      this.credentials.roles[0].roleid = data._id;
      this.enregistrerUser();
    },(err) => {
      console.error(err);
    });
  }

  private enregistrerUser(){
    console.log(this.credentials)
    this.auth.register(this.credentials).subscribe(() => {
      this.router.navigateByUrl('/productPlat');
    }, (err) => {
      console.error(err);
    });
  }
}
