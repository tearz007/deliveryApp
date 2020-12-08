import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Feature, MapService } from 'src/app/service/map/map.service';

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


  addresses = [];

  constructor(private mapServ: MapService,private route:Router) { 
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
    this.mapServ.setCoodination(this.lng,this.lat)
  }
  
  gotoMap(){
    this.route.navigate(['tap/map'])
  }

}
