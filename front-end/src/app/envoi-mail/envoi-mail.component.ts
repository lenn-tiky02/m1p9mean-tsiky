import { Component, OnInit } from '@angular/core';
import { MailContent, MailService } from '../services/mail.service';
import { ToastrService } from 'ngx-toastr';

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

  constructor(private toastr: ToastrService, private mailService : MailService) { }

  ngOnInit(): void {
  }

  envoyerMail() {    
    this.mailService.sendMail(this.mailObject) 
    .subscribe(data => {
      this.toastr.success('L \'email a bien été envoyé', 'Email envoyée!',{
        positionClass: 'toast-bottom-center'
      });
    });  
  }
}
