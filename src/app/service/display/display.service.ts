import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Products } from 'src/models/product';

@Injectable({
  providedIn: 'root'
})
export class DisplayService {

  collection: any
  cart=[]
  product$: Products;

  constructor(private afs: AngularFirestore) { }

  getImgs() {
    return this.afs.collection('categories').snapshotChanges();
  }
  getCategories(collec) {
    return this.afs.collection(collec).snapshotChanges();
  }

  getsub(collec) {
    return this.afs.collection('products').doc(collec).collection(collec).snapshotChanges();
  }

  getCart(_id,name) {
    return this.afs.collection('products').doc(name).collection(name).doc(_id).get()
  }

  setCollection(collec) {
    this.collection = collec
  }

  setCart(collec) {
    this.product$ = {
      id: collec.id,
      name: collec.name
    }
    let data={id:this.product$.id,name:this.product$.name}
    this.cart.push(data)
    console.log(this.product$.id)
    console.log(this.product$.name)

  }

}







/*
 setCart(collec){
    this.product$.subscribe(data=>{
      data.id=collec.id;
      data.name=collec.name
    })
  }




var  uid;

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

