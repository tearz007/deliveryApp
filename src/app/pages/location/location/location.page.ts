import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DisplayService } from 'src/app/service/display/display.service';
import { Feature, MapService } from 'src/app/service/map/map.service';
import { OrderService } from 'src/app/service/order/order.service';
import { UserInforService } from 'src/app/service/userInfor/user-infor.service';



@Component({
  selector: 'app-location',
  templateUrl: './location.page.html',
  styleUrls: ['./location.page.scss'],
})
export class LocationPage implements OnInit {


  checkAddress = "";

  delivery = false;
  collect = true;
  coordinates: any;
  list: any;
  selectedAddress: string = "";
  lat;
  lng;
  map

  addresses = [];

  delivePlace

  firebaseCard = []

  constructor(private mapServ: MapService, private route: Router,
    private displayService: DisplayService,
    private userInfor: UserInforService,
    private afs: AngularFirestore,
    public alertController: AlertController,
    private orderService: OrderService) {
    this.firebaseCard.push(this.displayService.cart)
  }

  ngOnInit() {

  }

  search(event: any) {
    const searchTerm = event.target.value.toLowerCase();
    if (searchTerm && searchTerm.length > 0) {
      this.mapServ.search_word(searchTerm)
        .subscribe((features: Feature[]) => {
          this.coordinates = features.map(feat => feat.geometry)
          this.addresses = features.map(feat => feat.place_name)
          this.list = features;
          console.log(this.list)
        });
    } else {
      this.addresses = [];
    }

  }

  addressCheck(event) {
    this.checkAddress = event.target.value;
    console.log("info", this.checkAddress);
  }

  onSelect(address, i) {
    this.selectedAddress = address;
    //  selectedcoodinates=
    console.log("lng:" + JSON.stringify(this.list[i].geometry.coordinates[0]))
    console.log("lat:" + JSON.stringify(this.list[i].geometry.coordinates[1]))
    this.lng = JSON.stringify(this.list[i].geometry.coordinates[0])
    this.lat = JSON.stringify(this.list[i].geometry.coordinates[1])
    // this.user.coords = [this.lng,this.lat];
    console.log("index =" + i)
    console.log(this.selectedAddress)
    // this.user.address = this.selectedAddress;
    this.addresses = [];
    this.mapServ.setCoodination(this.lng, this.lat)
  }

  async gotoMap() {

    if (this.delivePlace != null) {
      this.sendOrder();
      this.route.navigate(['tap/map'])
    }else{
      const alert = await this.alertController.create({
        cssClass: 'my-custom-class',
        header: 'warning',
        message: 'Please enter your street name',
        buttons: [
          {
            text: 'Ok',
            role: 'accept',
            cssClass: 'secondary',
            handler: (blah) => {
              // this.route.navigate(['tap/start-page'])
            }
          }
        ]

      });

      await alert.present();
    }


  }


  sendOrder() {
    // var id, name, image, price, quantity
    var product = []
    var temp = {}

    this.orderService.getOrder().forEach(a => {
      a.forEach(data => {
        temp = { id: data.id, name: data.name, image: data.image, price: data.price, longitude: this.lng, latitude: this.lat }
        product.push(temp)

      });
    });

    this.afs.collection('order').doc(localStorage.getItem("id")).set({
      Order: product

    }).then(() => {
      // alert("Order send")
      console.log("Order send")
    }).catch(err => {
      alert("Error writing document: " + err);
    });
  }


}
