import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

export interface PlatDetails {
  _id: string | null;
  nom: string;
  description: string;
  prixDeVente:  {
    $numberDecimal: number
  };
  prixDeRevient:  {
    $numberDecimal: number
  };
  statutDisponibilite: string;
  imagePath: string | null;
}

@Injectable()
export class PlatService {
  
  constructor(private http: HttpClient, private auth: AuthenticationService) {}

  public ajouterPlat(plat: PlatDetails): Observable<any> {    
    const body=JSON.stringify(plat);
    console.log(body)
    let returnn =  this.http.post<PlatDetails>(`/api/plats`, body, { headers: { 'content-type': 'application/json', Authorization: `Bearer ${this.auth.getToken()}` }})
    .pipe(retry(1), catchError(this.handleError));   
    return returnn;
  }

  public modifierPlat(plat: PlatDetails): Observable<any> {    
    const body=JSON.stringify(plat);
    console.log(body)
    let returnn =  this.http.put<PlatDetails>(`/api/plats/`+ plat._id, body, { headers: { 'content-type': 'application/json', Authorization: `Bearer ${this.auth.getToken()}` }})
    .pipe(retry(1), catchError(this.handleError));   
    return returnn;
  }

  public supprimerPlat(id: String): Observable<any> {        
    let returnn =  this.http.delete<PlatDetails>(`/api/plats/`+ id, { headers: { 'content-type': 'application/json', Authorization: `Bearer ${this.auth.getToken()}` }})
    .pipe(retry(1), catchError(this.handleError));   
    return returnn;
  }

  public getPlats(): Observable<PlatDetails[]>{
    return this.http.get<PlatDetails[]>(`/api/plats`, { headers: { Authorization: `Bearer ${this.auth.getToken()}` }});
  }

  public getPlatById(id: string): Observable<PlatDetails>{
    return this.http.get<PlatDetails>(`/api/plats/`+ id, { headers: { Authorization: `Bearer ${this.auth.getToken()}` }});
  }

  // Error handling
  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
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
