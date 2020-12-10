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
  addresses = [];

  lng=""
  lat=""

  constructor(private mapServ: MapService) { 
    this.lng = this.mapServ.lng;
    this.lat = this.mapServ.lat;
  }

  ngOnInit() {
  
    this.mapFunctions();

    this.mapFunction2();
    this.mapDirection();
      
    // this.mapDirection()
  }

  mapFunctions() {
    mapboxgl.accessToken = this.mapServ.key;
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
     // center: [28.61502, -26.45746],
      center:[this.lng, this.lat],  
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
      zoom: 15,
    });
    
    this.map.addControl(this.directions);

    console.log(this.lng, this.lat)
    this.directions.setOrigin([this.lng, this.lat]);
    this.directions.setDestination([29.61502, -27.65746])
    this.map.addControl(this.directions);
  }

  test(){
    console.log(this.lng, this.lat)
    this.directions.setOrigin([this.lng, this.lat]);
    this.directions.setDestination([29.61502, -27.65746])
    this.map.addControl(this.directions);
  }

}

