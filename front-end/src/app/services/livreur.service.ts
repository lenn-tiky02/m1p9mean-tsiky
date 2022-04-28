import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

export interface LivreurDetails {
  _id       : String | null;
  nom       : String;
  prenom  : String;
  telephone : String;  
  email     : String;
  zoneId     : String;
}

@Injectable()
export class LivreurService {
  
  constructor(private http: HttpClient, private auth: AuthenticationService) {}

  public ajouterLivreur(Livreur: LivreurDetails): Observable<any> {    
    const body=JSON.stringify(Livreur);
    console.log(body);
    let returnn =  this.http.post<LivreurDetails>(`/api/Livreurs`, body, { headers: { 'content-type': 'application/json', Authorization: `Bearer ${this.auth.getToken()}` }})
    .pipe(retry(1), catchError(this.handleError));   
    return returnn;
  }

  public modifierLivreur(Livreur: LivreurDetails): Observable<any> {    
    const body=JSON.stringify(Livreur);
    console.log(body)
    let returnn =  this.http.put<LivreurDetails>(`/api/Livreurs/`+ Livreur._id, body, { headers: { 'content-type': 'application/json', Authorization: `Bearer ${this.auth.getToken()}` }})
    .pipe(retry(1), catchError(this.handleError));   
    return returnn;
  }

  public supprimerLivreur(id: String): Observable<any> {        
    let returnn =  this.http.delete<LivreurDetails>(`/api/Livreurs/`+ id, { headers: { 'content-type': 'application/json', Authorization: `Bearer ${this.auth.getToken()}` }})
    .pipe(retry(1), catchError(this.handleError));   
    return returnn;
  }

  public getLivreurs(): Observable<LivreurDetails[]>{
    return this.http.get<LivreurDetails[]>(`/api/Livreurs`, { headers: { Authorization: `Bearer ${this.auth.getToken()}` }});
  }

  public getLivreurById(id: string): Observable<LivreurDetails>{
    return this.http.get<LivreurDetails>(`/api/Livreurs/`+ id, { headers: { Authorization: `Bearer ${this.auth.getToken()}` }});
  }

  public getLivreurByTextName(text: String): Observable<LivreurDetails[]>{
    return this.http.get<LivreurDetails[]>(`/api/Livreurs/bytext/`+ text);
  }

  public supprimerUserLivreur(id: String): Observable<any> {        
    let returnn =  this.http.delete<String>(`/api/users/`+ id, { headers: { 'content-type': 'application/json', Authorization: `Bearer ${this.auth.getToken()}` }})
    .pipe(retry(1), catchError(this.handleError));   
    return returnn;
  }

  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get Livreur-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}
