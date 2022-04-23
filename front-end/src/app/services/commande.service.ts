import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { ClientDetails } from './client.service';
import { PlatDetails } from './plat.service';
import { RestaurantDetails } from './restaurant.service';
import { identity } from 'rxjs';
import { DatePipe } from '@angular/common';

export interface CommandeReadDetails {
  _id: String | null;
  idClient: ClientDetails | null;
  listePlats: PlatDetails[] | null;
  idRestaurant: RestaurantDetails | null;
  statut: String;
  dateCommande: Date | null;
  dateLivraison: Date | null;  
  totalPrixDeVente: Number | null;
  totalPrixDeRevient: Number | null;
  totalPrixBenefice: Number | null;  
  idLivreur: String | null;
  showRow: Boolean;
}

export interface CommandeAddDetails { 
  _id: String | null;
  idClient: String | null;
  listePlats: String[];
  idRestaurant: String | null;
  statut: String;
  dateCommande: Date | null;
  dateLivraison: Date | null;
  idLivreur: String | null;
}

@Injectable()
export class CommandeService {
  
  constructor(private http: HttpClient, private auth: AuthenticationService, private datepipe: DatePipe) {}

  public ajouterCommande(Commande: CommandeAddDetails): Observable<any> {    
    const body=JSON.stringify(Commande);
    console.log(body)
    let returnn =  this.http.post<CommandeAddDetails>(`/api/commandes`, body, { headers: { 'content-type': 'application/json', Authorization: `Bearer ${this.auth.getToken()}` }})
    .pipe(retry(1), catchError(this.handleError));   
    return returnn;
  }

  public modifierCommande(Commande: CommandeAddDetails): Observable<any> {    
    const body=JSON.stringify(Commande);
    console.log(body)
    let returnn =  this.http.put<CommandeAddDetails>(`/api/commandes/`+ Commande._id, body, { headers: { 'content-type': 'application/json', Authorization: `Bearer ${this.auth.getToken()}` }})
    .pipe(retry(1), catchError(this.handleError));   
    return returnn;
  }

  public supprimerCommande(id: String | null): Observable<any> {        
    let returnn =  this.http.delete<CommandeAddDetails>(`/api/commandes/`+ id, { headers: { 'content-type': 'application/json', Authorization: `Bearer ${this.auth.getToken()}` }})
    .pipe(retry(1), catchError(this.handleError));   
    return returnn;
  }

  public getCommandes(): Observable<CommandeReadDetails[]>{
    return this.http.get<CommandeReadDetails[]>(`/api/commandes`, { headers: { Authorization: `Bearer ${this.auth.getToken()}` }});
  }

  public getCommandeById(id: String | null): Observable<CommandeAddDetails>{
    return this.http.get<CommandeAddDetails>(`/api/commandes/`+ id, { headers: { Authorization: `Bearer ${this.auth.getToken()}` }});
  }

  public getCommandeByRestaurant(id: string | null): Observable<CommandeReadDetails[]>{
    return this.http.get<CommandeReadDetails[]>(`/api/commandes/restaurant`, { headers: { Authorization: `Bearer ${this.auth.getToken()}` }});
  }

  public getCommandeByRestaurantAndDate(id: string | null, date: Date): Observable<CommandeReadDetails[]>{
    const body=JSON.stringify(
      {
         id,
         date : this.datepipe.transform(date, 'yyyy-MM-dd')
      });
   
    let returnn =  this.http.post<CommandeReadDetails[]>(`/api/commandes/restaurantDate`, body, { headers: { 'content-type': 'application/json', Authorization: `Bearer ${this.auth.getToken()}` }})
    .pipe(retry(1), catchError(this.handleError));   
    return returnn;
  }

  public getCommandeByRestaurantAndDateAndStatus(id: string | null, date: Date, statut: string | null): Observable<CommandeReadDetails[]>{
    const body=JSON.stringify(
      {
         id,
         date : this.datepipe.transform(date, 'yyyy-MM-dd'),
         statut 
      });
   
    let returnn =  this.http.post<CommandeReadDetails[]>(`/api/commandes/restaurantDateStatut`, body, { headers: { 'content-type': 'application/json', Authorization: `Bearer ${this.auth.getToken()}` }})
    .pipe(retry(1), catchError(this.handleError));   
    return returnn;
  }

  public getCommandeByRestaurantAndStatus(id: string | null, status: string | null): Observable<CommandeReadDetails[]>{
    return this.http.get<CommandeReadDetails[]>(`/api/commandes/restaurant/`+ id +`/status/`+ status, { headers: { Authorization: `Bearer ${this.auth.getToken()}` }});
  }

  public getCommandeByStatus(status: string | null): Observable<CommandeReadDetails[]>{
    return this.http.get<CommandeReadDetails[]>(`/api/commandes/status/`+ status, { headers: { Authorization: `Bearer ${this.auth.getToken()}` }});
  }

  public getCommandeByLivreur(id: string | null): Observable<CommandeReadDetails[]>{
    return this.http.get<CommandeReadDetails[]>(`/api/commandes/livreur/`+ id, { headers: { Authorization: `Bearer ${this.auth.getToken()}` }});
  }

  public getCommandeByClient(id: string | null): Observable<CommandeReadDetails[]>{
    return this.http.get<CommandeReadDetails[]>(`/api/commandes/client/`+ id, { headers: { Authorization: `Bearer ${this.auth.getToken()}` }});
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
