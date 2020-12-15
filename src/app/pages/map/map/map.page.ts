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

  lng = ""
  lat = ""
  lngD = ""
  latD = ""

  constructor(private mapServ: MapService) {
    this.lngD = this.mapServ.lng;
    this.latD = this.mapServ.lat;
  }

  ngOnInit() {
    this.lngD = this.mapServ.lng;
    this.latD = this.mapServ.lat;
    if (this.lngD != null) {
      this.lng = this.lngD;
      this.lat = this.latD;
    } else {
      this.lng = '28.61502';
      this.lat = '-26.45746';
    }

    this.mapFunctions();
    this.getCurrentLocation()
    this.mapFunction2();
    this.mapDirection();
    this.map.on('click', this.onMapClick)

  }

  mapFunctions() {
    mapboxgl.accessToken = this.mapServ.key;

    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      // center: [28.61502, -26.45746],
      center: [this.lng, this.lat],
      zoom: 10 // starting zoom
    });
  }


  onMapClick(e) {
    console.log('lat ', e.lngLat.lng)
    console.log('lat ', e.lngLat.lat)
  }

  mapFunction2() {
    this.map.on("load", () => {
      this.map.resize();
    });
    this.map.addControl(new mapboxgl.NavigationControl());
  }

  getCurrentLocation() {
    this.map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true,
        },
        fitBoundsOptions: {
          maxZoom: 30
        },
        trackUserLocation: true,

      })
    )
    console.log()
  }


  mapDirection() {

    this.directions = new MapboxDirections({
      accessToken: this.mapServ.key,
      unit: 'metric',
      profile: 'mapbox/cycling',
      mapboxgl,
      marker: true,
      collapsed: true,
      controls: { inputs: true, instructions: false, profileSwitcher: true },
      congestion: true,
      alternatives: true,
      routePadding: 25,
    });

    // this.map.addControl(this.directions);

    console.log(this.lng, this.lat)
    this.directions.setOrigin([this.lngD, this.latD]);
    this.directions.setDestination([29.61502, -27.65746])
    this.map.addControl(this.directions);
  }

  test() {
    console.log(this.lngD, this.latD)
    this.directions.setOrigin([this.lng, this.lat]);
    this.directions.setDestination([29.61502, -27.65746])
    this.map.addControl(this.directions);
  }

}

