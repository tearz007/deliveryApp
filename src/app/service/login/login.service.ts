import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { AngularFirestore } from '@angular/fire/firestore'
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { user } from 'src/models/user';
import firebase from 'firebase/app';




@Injectable({
  providedIn: 'root'
})
export class LoginService {

  user$: Observable<user>
  constructor(private auth: AngularFireAuth, private afs: AngularFirestore, private route: Router) {

  /*  this.user$ = this.auth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<user>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      }));*/
  }

  createAcc(email, pass) {
     return this.auth.createUserWithEmailAndPassword(email, pass);
  
  }

  checkUser() {
    return this.auth.user
  }


  /*-----------email an password login----------------*/
  userLogin(userName,password) {

    return this.auth.signInWithEmailAndPassword(userName,password);

  }
  /*-----------email an password End----------------*/


  /*-----------gmail login----------------*/
  gmailLogin() {
    const provider = new firebase.auth.GoogleAuthProvider;
    return this.auth.signInWithPopup(provider)
  }
  /*-----------Gmail end----------------*/




  /*-----------Facebook login----------------*/
  facebookLogin() {
    var provider = new firebase.auth.FacebookAuthProvider();
    provider.addScope('user_birthday');
    return this.auth.signInWithPopup(provider);
  }
 /* -----------Facebook End----------------*/

  logout() {
    return this.auth.signOut();
  }

  reloadComponent(routes) {
    this.route.routeReuseStrategy.shouldReuseRoute = () => false;
    this.route.onSameUrlNavigation = 'reload';
    this.route.navigate([routes]);
  }
}