import { Component } from '@angular/core';
import { AuthenticationService } from './services/authentication.service';
import { RoleGuardGuard } from './services/guards/role-guard.guard';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(public auth: AuthenticationService, public role: RoleGuardGuard) {}
}