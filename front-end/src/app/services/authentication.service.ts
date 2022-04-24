import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

export interface RoleUser {
  name: string;
  roleid: string | null;
}

export interface UserDetails {
  _id: string;
  email: string;
  name: string;
  exp: number;
  iat: number;
  roles: RoleUser[]
}

export interface TokenResponse {
  token: string | null;
}

export interface TokenPayload {
  email: string;
  password: string;
  name?: string;
  roles: RoleUser[]
}

@Injectable()
export class AuthenticationService {
  private token: string | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  private saveToken(tokenStr: string): void {  
    localStorage.setItem('mean-token', tokenStr);
    this.token = tokenStr;  
  }

  public getToken(): string | null {
    if (!this.token) {
      this.token = localStorage.getItem('mean-token');
    }
    return this.token;
  }

  public getUserDetails(): UserDetails | null{
    let token : String | null = this.getToken();   
    let payload;
    if (token) {
      payload = token.split('.')[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }

  public isLoggedIn(): boolean {
    const user = this.getUserDetails();
    if (user) {
      return user.exp > Date.now() / 1000;
    } else {
      return false;
    }
  }

  public getUserRoles(): RoleUser[] {
    const user = this.getUserDetails();
    if (user) {
      return user.roles;
    } else {
      return [];
    }
  }

  private request(method: 'post'|'get', type: 'login'|'register'|'profile', user?: TokenPayload, isSaveToken: boolean = true): Observable<any> {
    let base;
    if (method === 'post') {
      base = this.http.post<TokenResponse>(`/api/${type}`, user);
    } else {    
      base = this.http.get<TokenResponse>(`/api/${type}`, { headers: { Authorization: `Bearer ${this.getToken()}` }});
    }

    const request = base.pipe(
      map((data: TokenResponse) => {
        console.log('test token');
        console.log(data);
        if (data.token && isSaveToken) {
          this.saveToken(data.token);
        }
        return data;
      })
    );


    return request;
  }

  public register(user: TokenPayload): Observable<any> {
    return this.request('post', 'register', user);
  }

  public registerOnly(user: TokenPayload): Observable<any> {
    return this.request('post', 'register', user, false);
  }

  public login(user: TokenPayload): Observable<any> {
    return this.request('post', 'login', user);
  }

  public profile(): Observable<any> {
    return this.request('get', 'profile');
  }

  public logout(): void {
    this.token = '';
    window.localStorage.removeItem('mean-token');
    this.router.navigateByUrl('/');
  }
}
