import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore'
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

import firebase from 'firebase/app'
import { auth } from 'src/models/auth';


@Injectable({
  providedIn: 'root'
})
export class UserInforService {

  arry = []
  
  auth$: auth;
  person = {}
  
  constructor(private afs: AngularFirestore, private route: Router) {
    
  }

  currentUser() {
    var user = firebase.auth().currentUser;
    var uid;

    if (user != null) {
      uid = user.uid
    }
   return uid
  }

  setUser(person) {

    var users = firebase.auth().currentUser;
    var email, uid;

    if (users != null) {
      email = users.email;
      uid = users.uid;
    }
    this.auth$ = {
      name: person.name,
      email: person.email,
      phoneNumber: person.phoneNumber,
      password: person.password,
    }
    // let user = { name: this.user$.name, email: this.user$.email, phoneNumber: this.user$.phoneNumber, password: this.user$.password }
    // console.log(user)

    this.afs.collection('user').doc(uid).set({
      Email: email,
      Name: this.auth$.name,
      PhoneNumber: this.auth$.phoneNumber,
      password: this.auth$.password,
      id: uid
    }).then(function () {
      console.log("Document successfully written!");
    })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });

  }


  createCarrentUser() {
    var user = firebase.auth().currentUser;
    var name, email, photoUrl, pass, uid;

    if (user != null) {
      name = user.displayName;
      email = user.email;
      uid = user.uid;

    }
    this.afs.collection('user').doc(uid).set({
      Email: email,
      id: uid,
      Name: name,
    }).then(function () {
      console.log("Document successfully written!");
    })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });
  }

  setUserProfile() {
    return this.afs.collection('user').snapshotChanges();
  }



}

