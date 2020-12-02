import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore'
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { user } from 'src/models/user';
import firebase from 'firebase/app'


@Injectable({
  providedIn: 'root'
})
export class UserInforService {


  user$: Observable<user>
  constructor(private afs: AngularFirestore, private route: Router) {

  }

  currentUser() {
    var user = firebase.auth().currentUser;
    var name, email, photoUrl, uid;

    if (user != null) {
      name = user.displayName;
      email = user.email;
      uid = user.uid;
      console.log(email)
      console.log(uid)
    }
  }

  

  createUser() {
    var user = firebase.auth().currentUser;
    var name, email, photoUrl, pass, uid;

   this.afs.collection(uid).doc(uid).get().subscribe(data=>{
     data.id
   })

    if (user != null) {
      name = user.displayName;
      email = user.email;
      uid = user.uid;
     // console.log(email)
     /// console.log(uid)
    }

    this.afs.collection(uid).doc(uid).set({
      userName: email,
      id: uid,
    }).then(function () {
        console.log("Document successfully written!");
      })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });
  }
}
