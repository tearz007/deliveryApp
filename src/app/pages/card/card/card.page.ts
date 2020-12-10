import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DisplayService } from 'src/app/service/display/display.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.page.html',
  styleUrls: ['./card.page.scss'],
})
export class CardPage implements OnInit {
  cart = this.inforService.cart;
  temp = []
  firebaseCard = []
  totalPrice = 0;
  quntity = 1

  constructor(private inforService: DisplayService, private route: Router) { }

  ngOnInit() {

    this.cart.forEach(b => {
      console.log(b.name)
      this.inforService.getCart(b.id, b.name).subscribe(firebaseData => {
        // this.firebaseCard.push(data.data())
        //to temp
        this.temp = []
        firebaseData.forEach(a => {

          let data = a.payload.doc.data();
          data.id = a.payload.doc.id;


          var existItem = this.cart.find(x => x.id == data.id);

          if (existItem) {
            // to temp
            this.temp.push(data)
          }
          else {
            // console.log("item Do exist");
          }

        })
        //to temp
        this.temp.forEach(a => {
          var existItem = this.firebaseCard.find(x => x.id == a.id);
          if (existItem) {

          }
          else {
            this.totalPrice=0
            // console.log("item Do exist");
            this.firebaseCard.push(a)
            //to fire
            console.log('pushed')
            this.firebaseCard.forEach(a => {
              this.totalPrice=this.totalPrice+a.price
              // console.log(this.totalPrice)
            });
          }
        });

      })

    });
  }

  getPrice(){
    this.firebaseCard.forEach(a => {
      this.totalPrice=this.totalPrice+a.price
      console.log(this.totalPrice)
    });
  }

  deleteItem(id) {

    for (let i = 0; i < this.inforService.cart.length; i++) {
      if (id == this.inforService.cart[i].id) {
        this.totalPrice=this.totalPrice-this.firebaseCard[i].price
        this.firebaseCard.splice(i, 1)
        this.inforService.cart.splice(i, 1)
      }
    }
  }

  add(id,quntity) {

    var existItem = this.firebaseCard.find(x => x.id == id);

    if (existItem) {
       quntity=quntity+1
       console.log(quntity)
    }
    else {

    }

  }

  subtract() {
    if (this.quntity > 1) {
      this.quntity = this.quntity - 1
    }
  }

  gotoLocation() {
    this.route.navigate(['location'])
  }

}

