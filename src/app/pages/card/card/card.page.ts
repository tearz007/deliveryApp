import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DisplayService } from 'src/app/service/display/display.service';
import { OrderService } from 'src/app/service/order/order.service';
import { UserInforService } from 'src/app/service/userInfor/user-infor.service';

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
  quntity = 1;

  constructor(private afs: AngularFirestore, private inforService: DisplayService,
    private userInfor: UserInforService, private route: Router,
    public alertController: AlertController,
    private orderService: OrderService) { }

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
            this.temp.push(data)
          }
          else {
            // console.log("item Do exist");
          }

        })

        this.temp.forEach(a => {
          var existItem = this.firebaseCard.find(x => x.id == a.id);
          if (existItem) {

          }
          else {
            this.totalPrice = 0
            // console.log("item Do exist");
            this.firebaseCard.push(a)
            //to fire
            console.log('pushed')
            this.firebaseCard.forEach(a => {
              this.totalPrice = this.totalPrice + a.price
              // console.log(this.totalPrice)
            });
          }
        });

      })

    });
  }

  getPrice() {
    this.firebaseCard.forEach(a => {
      this.totalPrice = this.totalPrice + a.price
      console.log(this.totalPrice)
    });
  }

  deleteItem(id) {

    for (let i = 0; i < this.inforService.cart.length; i++) {
      if (id == this.inforService.cart[i].id) {
        this.totalPrice = this.totalPrice - this.firebaseCard[i].price
        this.firebaseCard.splice(i, 1)
        this.inforService.cart.splice(i, 1)
      }
    }
  }

  add(id, quntity) {

    var existItem = this.firebaseCard.find(x => x.id == id);

    if (existItem) {
      quntity = quntity + 1
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


  async presentAlertConfirm() {

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: 'Checkout',
      message: 'Are you sure you want to Checkout? totalprice is R' + this.totalPrice,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          }
        }, {
          text: 'Yes',
          handler: () => {
            console.log('Confirm Okay');
            this.setOrder()
            this.route.navigate(['location'])

          }
        }
      ]
    });

    await alert.present();
  }


  setOrder() {
    var id, name, image, price, quantity
    var product = []
    var temp = {}

    for (let i = 0; i < this.firebaseCard.length; i++) {

      temp = { id: this.firebaseCard[i].id, name: this.firebaseCard[i].name, image: this.firebaseCard[i].image, price: this.firebaseCard[i].price }
      product.push(temp)
    }
    this.orderService.setOrder(product)
    /* this.afs.collection('order').doc(this.userInfor.currentUser()).set({
       orderName: product
 
     }).then(function () {
       alert("Order send")
     })
       .catch(function (error) {
         console.error("Error writing document: ", error);
       });*/
  }


  gotoLocation() {
    this.route.navigate(['location'])
  }

}

