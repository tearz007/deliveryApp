import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { DisplayService } from 'src/app/service/display/display.service';
import { Products } from 'src/models/product';

@Component({
  selector: 'app-model',
  templateUrl: './model.page.html',
  styleUrls: ['./model.page.scss'],
})
export class ModelPage implements OnInit {

  fireData = []
  collect: string
  product$: Observable<Products>


  constructor(private route: Router, public modalCtrl: ModalController, private inforService: DisplayService) { }

  ngOnInit() {
    this.collect = this.inforService.collection
    this.inforService.getsub(this.collect).subscribe(firebaseData => {
      this.fireData = []
      firebaseData.forEach(a => {
        let data: any = a.payload.doc.data()
        data.id = a.payload.doc.id
        this.fireData.push(data)
      });
    })

  }

  dismiss() {

    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

  addCart(_id) {
    let product = { id: _id, name: this.collect }

    let cart = this.inforService.cart;
    if (cart.length > 0) {
      cart.forEach(a => {
        this.inforService.getCart(a.id, a.name).subscribe(data => {
          if (data.id === _id) {
            console.log('id exists')
            
          } else {
            this.inforService.setCart(product)  
          }
        })
      });
    } 
    else {
      this.inforService.setCart(product)
      
    }


    // this.inforService.setCart(product)
  }

  gotoCart() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
    this.route.navigate(['tap/cart'])

  }

}
