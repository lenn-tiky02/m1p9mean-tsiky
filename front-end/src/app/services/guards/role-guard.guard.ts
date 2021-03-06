import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthenticationService, RoleUser } from '../authentication.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardGuard implements CanActivate {
  constructor(private auth: AuthenticationService, private router: Router) {}
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.isAuthorised(route);
  }
  
  isAuthorised(route: ActivatedRouteSnapshot): boolean{
    const roles: RoleUser[] = this.auth.getUserRoles();
    const expectedRoles = route.data['expectedRoles'];
    //if equals -1 there is no match
    const roleMatches = roles.findIndex(role => expectedRoles.indexOf(role.name) !== -1);
    return (roleMatches < 0) ? false : true;
  }

  
  isNavAuthorised(expectedRole : string[]): boolean{
    const roles: RoleUser[] = this.auth.getUserRoles();
    const expectedRoles = expectedRole;
    //if equals -1 there is no match
    const roleMatches = roles.findIndex(role => expectedRoles.indexOf(role.name) !== -1);
    return (roleMatches < 0) ? false : true;
  }
}
