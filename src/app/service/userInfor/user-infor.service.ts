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

arry=[]
  user$: Observable<user>
  constructor(private afs: AngularFirestore, private route: Router) {

  }

  currentUser() {
    var user = firebase.auth().currentUser;
    var  uid;

     if(user!=null){
       uid=user.uid
     }
    this.afs.collection(uid).snapshotChanges().subscribe(firebaseData=>{
            
      firebaseData.forEach(a => {
        this.arry=[]
        let data:any=a.payload.doc.data();
        data.id=a.payload.doc.id;
        this.arry.push(data)
      });

      this.arry.forEach(a=> {
        console.log(a)
        //console.log(a.id)
      });
    })
  }


  createUser() {
    var user = firebase.auth().currentUser;
    var name, email, photoUrl, pass, uid;

    if (user != null) {
      name = user.displayName;
      email = user.email;
      uid = user.uid;

    }
    this.afs.collection(uid).doc(uid).set({
      Email: email,
      id: uid,
      Name: name,
    }).then(function () {
      console.log("Document successfully written!");
    })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });

   /**/
  }


}
/*this.afs.collection(uid).doc().set({
          Email: email,
          idL: uid,
          Name: name,
        }).then(function () {
          console.log("Document successfully written!");
        })
          .catch(function (error) {
            console.error("Error writing document: ", error);
          });
          
          
          
         
          
              this.afs.collection(uid).doc(a.id).get().subscribe(f => {
          if (f.exists) {
            console.log("Document data:", f.data());
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        }); */