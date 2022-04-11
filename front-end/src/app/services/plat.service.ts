import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

export interface PlatDetails {
  nom: string;
  description: string;
  prixDeVente:  {
    $numberDecimal: number
  };
  prixDeRevient:  {
    $numberDecimal: number
  };
  statutDisponibilite: string;
  imagePath: string;
}

@Injectable()
export class PlatService {
  
  constructor(private http: HttpClient, private auth: AuthenticationService) {}

  public ajouterPlat(plat: PlatDetails): Observable<any> {
    console.log("****************");
    console.log(plat);
    console.log(this.auth.getToken());
    console.log("****************");
    const body=JSON.stringify(plat);
    console.log(body)
    let returnn =  this.http.post<PlatDetails>(`/api/plats`, body, { headers: { 'content-type': 'application/json', Authorization: `Bearer ${this.auth.getToken()}` }})
    .pipe(retry(1), catchError(this.handleError));
    console.log("****************");
    console.log(returnn);
    console.log("****************");
    return returnn;
  }

  public getPlats(): Observable<PlatDetails[]>{
    return this.http.get<PlatDetails[]>(`/api/plats`, { headers: { Authorization: `Bearer ${this.auth.getToken()}` }});
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
