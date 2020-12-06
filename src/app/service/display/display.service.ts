import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class DisplayService {

  collection
  constructor(private afs: AngularFirestore) { }

  getImgs() {
    return this.afs.collection('categories').snapshotChanges();
  }
  getCategories(collec) {
    return this.afs.collection(collec).snapshotChanges();
  }

  setCollection(collec) {
    this.collection = collec
  }

}


/*   var  uid;

    //  if(user!=null){
    //    uid=user.uid
    //  }
    this.afs.collection('categories').snapshotChanges().subscribe(firebaseData=>{

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
    }) */

