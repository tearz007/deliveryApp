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
  
  cartLength
  product$: Observable<Products>
  cart = this.inforService.cart;

  data: any;
  constructor(private route: Router, public modalCtrl: ModalController, private inforService: DisplayService) { }

  ngOnInit() {

    
    this.ionViewWillEnter()
    
    this.cartLength=this.inforService.cart.length;
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

  ionViewWillEnter() {
    setTimeout(() => {
      this.data = {
        'heading': 'Normal text',
        'para1': 'Lorem ipsum dolor sit amet, consectetur',
        'para2': 'adipiscing elit.'
      };
    }, 5000);
  }

  dismiss() {

    this.modalCtrl.dismiss({
      'dismissed': true
    });
  }

  addToCart(_id,_name,_price,_img) {
    let product = { id: _id, name: _name,price:_price,image:_img }

    var existItem = this.cart.find(x => x.id == _id);

    if (existItem) {
      console.log("item already exist");

    }
    else {
      this.inforService.setCart(product);
      
      // this.cartLength=this.inforService.cart.length;
    }
    // console.log(this.inforService.cart)
  }

  gotoCart() {
    this.modalCtrl.dismiss({
      'dismissed': true
    });
    this.route.navigate(['tap/cart'])
  }

}





/*if (this.cart.length > 0) {

      console.log(this.cart)
      this.cart.forEach(a => {
        this.inforService.getCart(a.id, a.name).subscribe(data => {

        })
      });
    }
    else {
        console.log('id added in < 0')
        this.inforService.setCart(product)
        console.log('added')
    }
    // this.inforService.setCart(product) */