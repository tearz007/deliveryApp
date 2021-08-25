import { Component, OnInit ,DoCheck, OnChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Feature, MapService } from '../../../service/map/map.service';
import { CoodinateService } from 'src/app/service/coodinate.service';
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

  constructor(private mapServ: MapService ,  
    private coodinateServ:CoodinateService,
    private activeRouter:ActivatedRoute) {
  }

  ngDoCheck(): void {
   
    this.lngD = this.coodinateServ.lng;
    this.latD = this.coodinateServ.lat;
    console.log( " on change "+this.lngD + this.latD )

    this.directions.setOrigin([this.lngD,this.latD ]);
    this.directions.setDestination([29.61502, -27.65746]);
    // this.map.addControl(this.directions);
  

  }

  ngOnInit() {
    this.lngD = this.coodinateServ.lng;
    this.latD = this.coodinateServ.lat;

    if (this.lngD != null) {
      this.lng = this.lngD;
      this.lat = this.latD;
    } else {
      this.lng = '28.61502';
      this.lat = '-26.45746';
    }
    console.log( " from the "+this.lng + this.lat )
    this.mapFunctions();
    this.mapDirection();
    this.getCurrentLocation()
    this.mapFunction2();
    this.map.on('click', this.onMapClick)
  }

  mapFunctions() {
    mapboxgl.accessToken = this.mapServ.key;

    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      // center: [28.61502, -26.45746],
      center: [this.lng, this.lat],
      zoom: 15 // starting zoom
    });
    this.resizeMap();
  }

  resizeMap() {
    this.map.on("load", () => {
      this.map.resize();
    });
  }

  mapFunction2() {
    this.map.on("load", () => {
      this.map.resize();
    });
    this.map.addControl(new mapboxgl.NavigationControl());
  }


  onMapClick(e) {
    console.log('lat ', e.lngLat.lng)
    console.log('lat ', e.lngLat.lat)
  }


  getCurrentLocation() {
    this.resizeMap();
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
    this.resizeMap();
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
      interactive:false
    });

    // this.map.addControl(this.directions);

    // console.log(this.lng, this.lat)
    this.directions.setOrigin([this.lng,this.lat]);
    this.directions.setDestination([29.61502, -27.65746]);
    this.map.addControl(this.directions);
  }

  test() {
    console.log(this.lngD, this.latD)
    this.directions.setOrigin([this.lng, this.lat]);
    this.directions.setDestination([29.61502, -27.65746])
    this.map.addControl(this.directions);
  }

}

