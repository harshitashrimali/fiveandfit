import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase, AngularFireObject } from 'angularfire2/database';
import { DbUser } from '../models/DbUser';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private afAuth: AngularFireAuth, private db: AngularFireDatabase) { }

  register(registerData) {
    return this.afAuth.auth.createUserWithEmailAndPassword(registerData.email, registerData.password);
  }

  login(loginData){
    return this.afAuth.auth.signInWithEmailAndPassword(loginData.email, loginData.password);
  }

  createUser(uid, userData) {
    //this.db.list('users').push(userData);
    //this.db.object('users/'+uid).update(userData);
    
    this.db.object('users/'+uid).update({
      name: userData.name,
      email: userData.email
    });
  }

  getDbUser(uid): AngularFireObject<DbUser>{
    return this.db.object('users/'+uid);
  }
}

