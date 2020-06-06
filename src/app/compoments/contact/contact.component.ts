import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/services/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {
  errorMessage: string;
  successMessage: string;
  constructor(private contactService: ContactService) { }

  ngOnInit() {
  }

  saveContact(contactForm) {
    let contactData = contactForm.value;
    let result = this.contactService.create(contactData);
    result.then(response => {
      contactForm.resetForm();
      this.successMessage = "Thank you for contacting us. We've recieved your request and get back to you soon.";
    }).catch(error => {
      this.errorMessage = error.message;
    });
  }

}

