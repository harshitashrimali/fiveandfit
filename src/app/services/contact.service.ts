
import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private db: AngularFireDatabase) { }

  create(contactData) {
    return this.db.list('contactqueries').push(contactData);
  }
}