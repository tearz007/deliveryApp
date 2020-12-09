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

    //  this.map.on('click', this.onMapClick);
    this.map.on('load', this.marker);
    this. mapDirection()
  }

  marker() {

  }

  mapFunctions() {
    mapboxgl.accessToken = this.mapServ.key;
    this.map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [28.61502, -26.45746],
      //center:[-77.020945, 38.878241],  
      zoom: 5 // starting zoom
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
    this.map.addControl(
      new MapboxDirections({
        accessToken: mapboxgl.accessToken

      }),
      'top-left'
    );
  }

  viewD() {

    this.map.on('load', function () {
      // Insert the layer beneath any symbol layer.
      var layers = this.service.map.getStyle().layers;

      var labelLayerId;
      for (var i = 0; i < layers.length; i++) {
        if (layers[i].type === 'symbol' && layers[i].layout['text-field']) {
          labelLayerId = layers[i].id;
          break;
        }
      }
      this.service.map.addLayer(
        {
          'id': '3d-buildings',
          'source': 'composite',
          'source-layer': 'building',
          'filter': ['==', 'extrude', 'true'],
          'type': 'fill-extrusion',
          'minzoom': 15,
          'paint': {
            'fill-extrusion-color': '#aaa',

            // use an 'interpolate' expression to add a smooth transition effect to the
            // buildings as the user zooms in
            'fill-extrusion-height': [
              'interpolate',
              ['linear'],
              ['zoom'],
              15,
              0,
              15.05,
              ['get', 'height']
            ],
            'fill-extrusion-base': [
              'interpolate',
              ['linear'],
              ['zoom'],
              15,
              0,
              15.05,
              ['get', 'min_height']
            ],
            'fill-extrusion-opacity': 0.6
          }
        },
        labelLayerId
      );
    });
  }



  //  .setLngLat([28.61502, -26.45746])


}

