import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { ClientDetails } from './client.service';
import { PlatDetails } from './plat.service';
import { RestaurantDetails } from './restaurant.service';

export interface CommandeReadDetails {
  _id: String | null;
  idClient: ClientDetails | null;
  listePlats: PlatDetails[] | null;
  idRestaurant: RestaurantDetails | null;
  statut: String;
  dateCommande: Date | null;
  dateLivraison: Date | null;
}

export interface CommandeAddDetails { 
  _id: String | null;
  idClient: String | null;
  listePlats: String[];
  idRestaurant: String | null;
  statut: String;
  dateCommande: Date | null;
  dateLivraison: Date | null;
}

@Injectable()
export class CommandeService {
  
  constructor(private http: HttpClient, private auth: AuthenticationService) {}

  public ajouterCommande(Commande: CommandeAddDetails): Observable<any> {    
    const body=JSON.stringify(Commande);
    console.log(body)
    let returnn =  this.http.post<CommandeAddDetails>(`/api/Commandes`, body, { headers: { 'content-type': 'application/json', Authorization: `Bearer ${this.auth.getToken()}` }})
    .pipe(retry(1), catchError(this.handleError));   
    return returnn;
  }

  public modifierCommande(Commande: CommandeAddDetails): Observable<any> {    
    const body=JSON.stringify(Commande);
    console.log(body)
    let returnn =  this.http.put<CommandeAddDetails>(`/api/Commandes/`+ Commande._id, body, { headers: { 'content-type': 'application/json', Authorization: `Bearer ${this.auth.getToken()}` }})
    .pipe(retry(1), catchError(this.handleError));   
    return returnn;
  }

  public supprimerCommande(id: String): Observable<any> {        
    let returnn =  this.http.delete<CommandeAddDetails>(`/api/Commandes/`+ id, { headers: { 'content-type': 'application/json', Authorization: `Bearer ${this.auth.getToken()}` }})
    .pipe(retry(1), catchError(this.handleError));   
    return returnn;
  }

  public getCommandes(): Observable<CommandeReadDetails[]>{
    return this.http.get<CommandeReadDetails[]>(`/api/Commandes`, { headers: { Authorization: `Bearer ${this.auth.getToken()}` }});
  }

  public getCommandeById(id: string): Observable<CommandeReadDetails>{
    return this.http.get<CommandeReadDetails>(`/api/Commandes/`+ id, { headers: { Authorization: `Bearer ${this.auth.getToken()}` }});
  }

  public getCommandeByRestaurant(id: string | null): Observable<CommandeReadDetails[]>{
    return this.http.get<CommandeReadDetails[]>(`/api/Commandes/restaurant/`+ id, { headers: { Authorization: `Bearer ${this.auth.getToken()}` }});
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
