import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import * as firebase from '@angular/fire';


 


@Injectable()
export class UploadService {
  
 //// constructor(private ) {}

 /* public sendMail(mail: MailContent): Observable<any> {

    const body=JSON.stringify(mail);
    console.log(body)
    let result =  this.http.post<MailContent>(`/api/sendMail`, body, { headers: { 'content-type': 'application/json', Authorization: `Bearer ${this.auth.getToken()}` }})

    return result;
  }*/

}
