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
      this.firebaseCard.push(b)
      this.totalPrice = this.totalPrice + b.price
    })
  }


  deleteItem(id) {

    var existItem = this.cart.find(x => x.id == id);

    for (let i = 0; i < this.inforService.cart.length; i++) {
      if (id == this.inforService.cart[i].id) {
        this.totalPrice = this.totalPrice - this.firebaseCard[i].price
        this.firebaseCard.splice(i, 1)
        this.inforService.cart.splice(i, 1)
      }
    }
  }


  getPrice() {
    /* this.firebaseCard.forEach(a => {
       this.totalPrice = this.totalPrice + a.price
       console.log(this.totalPrice)
     });*/

    this.cart.forEach(a => {
      this.totalPrice = this.totalPrice + a.price
    });
  }






  async presentAlertConfirm() {

    var isLoggedin = localStorage.getItem("id");

    if (isLoggedin) {
      console.log(isLoggedin)


      if (this.totalPrice > 0) {
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
      } else {
        const alert = await this.alertController.create({
          cssClass: 'my-custom-class',
          header: 'warning',
          message: 'unable to checkout. Add items',
          buttons: [
            {
              text: 'Ok',
              role: 'accept',
              cssClass: 'secondary',
              handler: (blah) => {
                this.route.navigate(['tap/start-page'])
              }
            }
          ]

        });

        await alert.present();
      }
    } else {
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'warning',
        message: 'Please login to be able to chechout ',
        buttons: [
          {
            text: 'Ok',
            role: 'accept',
            cssClass: 'secondary',
            handler: (blah) => {
              this.route.navigate(['login'])
            }
          }
        ]

      });

      await alert.present();
    }


  }


  setOrder() {
    var id, name, image, price, quantity
    var product = []
    var temp = {}

    for (let i = 0; i < this.firebaseCard.length; i++) {

      temp = { id: this.firebaseCard[i].id, name: this.firebaseCard[i].name, image: this.firebaseCard[i].image, price: this.firebaseCard[i].price}
      product.push(temp)
    }
    this.orderService.setOrder(product)

  }


  gotoLocation() {
    this.route.navigate(['location'])
  }

}





/*


 this.cart.forEach(b => {
      this.inforService.getCart(b.id, b.name).subscribe(firebaseData => {

        this.temp = []
        firebaseData.forEach(a => {

          let data = a.payload.doc.data();
          data.id = a.payload.doc.id;
          var existItem = this.cart.find(x => x.id == data.id);

          for (let i = 0; i < this.cart.length; i++) {

            if (this.cart[i].id==data.id) {
              console.log(this.cart[i].id)
            }

          }
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

      // Quantity code
      console.log('end line')
      this.inforService.getQuantity(b.name, b.id).subscribe(data => {

        this.temp = []
        data.forEach(a => {

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
      })
    });
*/