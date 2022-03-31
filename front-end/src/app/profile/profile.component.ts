import { Component } from '@angular/core';
import { AuthenticationService, UserDetails } from '../services/authentication.service';

@Component({
  templateUrl: './profile.component.html'
})
export class ProfileComponent {
  details: UserDetails | null = null;

  constructor(private auth: AuthenticationService) {}
  
  ngOnInit() {    
    this.auth.profile().subscribe(user => {
      this.details = user;
    }, (err) => {
      console.error(err);
    });
  }
}
