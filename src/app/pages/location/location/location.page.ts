import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { CoodinateService } from 'src/app/service/coodinate.service';
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
  Name
  PhoneNumber

  firebaseCard = []

  constructor(private mapServ: MapService, private route: Router,
    private coodinateService:CoodinateService,
    private displayService: DisplayService,
    private userInfor: UserInforService,
    private afs: AngularFirestore,
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
    this.coodinateService.setCoodination(this.lng, this.lat);

   
  }

  gotoMap() {
    // this.sendOrder();
    // this.route.navigate(['tap-page/map'])
    this.route.navigate(['tap-page/map'], {
      queryParams: {
        lngi:this.lng,
        lati:this.lat
      },
    });
  }


  sendOrder() {
    var id, name, image, price, quantity
    var product = []
    var temp = {}

    this.orderService.getOrder().forEach(a => {
      a.forEach(data => {
        temp = { id: data.id, name: data.name, image: data.image, price: data.price, quantity: data.quantity, longitude: this.lng, latitude: this.lat }
        product.push(temp)

      });
    });

    this.afs.collection('order').doc(this.userInfor.currentUser()).set({
      Order: product

    }).then(function () {
      // alert("Order send")
    })
      .catch(function (error) {
        console.error("Error writing document: ", error);
      });
  }


}
