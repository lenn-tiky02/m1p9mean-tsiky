import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

export interface ClientDetails {
  _id: string | null;
  adresseLivraison: string;
  email: string;
  telephone: string;
  location: string;
  zoneId: string;
}

@Injectable()
export class ClientService {
  
  constructor(private http: HttpClient, private auth: AuthenticationService) {}

  public ajouterClient(Client: ClientDetails): Observable<any> {    
    const body=JSON.stringify(Client);
    console.log(body)
    let returnn =  this.http.post<ClientDetails>(`/api/clients`, body, { headers: { 'content-type': 'application/json', Authorization: `Bearer ${this.auth.getToken()}` }})
    .pipe(retry(1), catchError(this.handleError));   
    return returnn;
  }

  public modifierClient(Client: ClientDetails): Observable<any> {    
    const body=JSON.stringify(Client);
    console.log(body)
    let returnn =  this.http.put<ClientDetails>(`/api/clients/`+ Client._id, body, { headers: { 'content-type': 'application/json', Authorization: `Bearer ${this.auth.getToken()}` }})
    .pipe(retry(1), catchError(this.handleError));   
    return returnn;
  }

  public supprimerClient(id: String): Observable<any> {        
    let returnn =  this.http.delete<ClientDetails>(`/api/clients/`+ id, { headers: { 'content-type': 'application/json', Authorization: `Bearer ${this.auth.getToken()}` }})
    .pipe(retry(1), catchError(this.handleError));   
    return returnn;
  }

  public getClients(): Observable<ClientDetails[]>{
    return this.http.get<ClientDetails[]>(`/api/clients`, { headers: { Authorization: `Bearer ${this.auth.getToken()}` }});
  }

  public getClientById(id: string): Observable<ClientDetails>{
    return this.http.get<ClientDetails>(`/api/Clients/`+ id, { headers: { Authorization: `Bearer ${this.auth.getToken()}` }});
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
