import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  orderItems = []
  constructor(private afs: AngularFirestore) { }


  setOrder(Prodact) {
    this.orderItems.push(Prodact)
  }

  getOrder(){
    return this.orderItems
  }
}
