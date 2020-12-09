import { Component, OnInit } from '@angular/core';
import { Feature, MapService } from '../../../service/map/map.service'
declare var mapboxgl;
declare var MapboxDirections;
declare var MapboxGeocoder;


@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {


  /**/
  map;
  turf;
  directions

  checkAddress = "";

  delivery = false;
  collect = true;
  coordinates: any;
  list: any;
  selectedAddress: string = "";
  lat;
  lng;


  addresses = [];

  constructor(private mapServ: MapService) { }

  ngOnInit() {

    this.mapFunctions();

    this.mapFunction2();
    this.mapDirection()
    //  this.map.on('click', this.onMapClick);
    this.map.on('load', this.vidf);
    // this.mapDirection()
  }

  mapFunctions() {
    mapboxgl.accessToken = this.mapServ.key;
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [28.61502, -26.45746],
      //center:[-77.020945, 38.878241],  
      zoom: 10 // starting zoom
    });
  }


  onMapClick(e) {
    // alert("You clicked the map at " + e.lngLat.lng);
    // alert("You clicked the map at " + e.lngLat);
    console.log('lat ', e.lngLat.lng)
    console.log('lat ', e.lngLat.lat)
    //this.marker(e.lngLat.lng,e.lngLat.lat)
  }

  mapFunction2() {
    this.map.on("load", () => {
      this.map.resize();
    });
    this.map.addControl(new mapboxgl.NavigationControl());

  }
  mapLocation() {
    this.map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        trackUserLocation: true
      })
    );
  }

  mapDirection() {

    this.directions = new MapboxDirections({
      accessToken: this.mapServ.key,
      unit: 'metric',
      profile: 'mapbox/cycling',
      mapboxgl,
      marker: true,
      collapsed: true,
      controls: { inputs: false, instructions: false, profileSwitcher: true },
      congestion: true,
      alternatives: true,
      routePadding: 25,
      zoom:15
    });
    this.map.addControl(this.directions);

    this.directions.setOrigin([28.61502, -26.45746]);
    this.directions.setDestination([29.61502, -27.65746])
  }

  vidf() {
    
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
  }


}

