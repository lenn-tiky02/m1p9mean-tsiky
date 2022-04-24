import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';

export interface RestaurantDetails {
  _id       : String | null;
  nom       : String;
  location  : String;
  email     : String;
  telephone : String;
}

@Injectable()
export class RestaurantService {
  
  constructor(private http: HttpClient, private auth: AuthenticationService) {}

  public ajouterRestaurant(Restaurant: RestaurantDetails): Observable<any> {    
    const body=JSON.stringify(Restaurant);
    console.log(body)
    let returnn =  this.http.post<RestaurantDetails>(`/api/restaurants`, body, { headers: { 'content-type': 'application/json', Authorization: `Bearer ${this.auth.getToken()}` }})
    .pipe(retry(1), catchError(this.handleError));   
    return returnn;
  }

  public modifierRestaurant(Restaurant: RestaurantDetails): Observable<any> {    
    const body=JSON.stringify(Restaurant);
    console.log(body)
    let returnn =  this.http.put<RestaurantDetails>(`/api/restaurants/`+ Restaurant._id, body, { headers: { 'content-type': 'application/json', Authorization: `Bearer ${this.auth.getToken()}` }})
    .pipe(retry(1), catchError(this.handleError));   
    return returnn;
  }

  public supprimerRestaurant(id: String): Observable<any> {        
    let returnn =  this.http.delete<RestaurantDetails>(`/api/restaurants/`+ id, { headers: { 'content-type': 'application/json', Authorization: `Bearer ${this.auth.getToken()}` }})
    .pipe(retry(1), catchError(this.handleError));   
    return returnn;
  }

  public getRestaurants(): Observable<RestaurantDetails[]>{
    return this.http.get<RestaurantDetails[]>(`/api/restaurants`, { headers: { Authorization: `Bearer ${this.auth.getToken()}` }});
  }

  public getRestaurantById(id: string): Observable<RestaurantDetails>{
    return this.http.get<RestaurantDetails>(`/api/restaurants/`+ id, { headers: { Authorization: `Bearer ${this.auth.getToken()}` }});
  }

  public getRestaurantByTextName(text: String): Observable<RestaurantDetails[]>{
    return this.http.get<RestaurantDetails[]>(`/api/restaurants/bytext/`+ text);
  }

  public supprimerUserRestaurant(id: String): Observable<any> {        
    let returnn =  this.http.delete<String>(`/api/users/`+ id, { headers: { 'content-type': 'application/json', Authorization: `Bearer ${this.auth.getToken()}` }})
    .pipe(retry(1), catchError(this.handleError));   
    return returnn;
  }

  handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get Restaurant-side error
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
