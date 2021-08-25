import { Injectable,DoCheck } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CoodinateService {

  lat
  lng
  constructor() { }

  setCoodination(_lng,_lat){
    this.lng=_lng;
    this.lat=_lat;
    console.log("got tham as"+ this.lng);
  }
}
