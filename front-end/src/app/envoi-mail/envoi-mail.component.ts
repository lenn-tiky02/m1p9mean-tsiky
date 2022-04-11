import { Component, OnInit } from '@angular/core';
import { MailContent, MailService } from '../services/mail.service';

@Component({
  selector: 'app-envoi-mail',
  templateUrl: './envoi-mail.component.html',
  styleUrls: ['./envoi-mail.component.css']
})
export class EnvoiMailComponent implements OnInit {
  mailObject: MailContent = {  
    to:      '',
    cc:      'test.admin.ekaly@yopmail.com',
    subject: '',
    text:    ''
  };

  constructor(private mailService : MailService) { }

  ngOnInit(): void {
  }

  envoyerMail() {    
    console.log(this.mailObject);
    this.mailService.sendMail(this.mailObject) 
    .subscribe(data => {
      console.log(data);
    });  
  }
}
