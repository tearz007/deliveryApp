import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router'

@Component({
  selector: 'app-tap',
  templateUrl: './tap.page.html',
  styleUrls: ['./tap.page.scss'],
})
export class TapPage implements OnInit {

  constructor(private route:Router) { }

  ngOnInit() {
  }

  toHome(){
    this.route.navigate(['tap/start-page'])
  }
  toCart(){
    this.route.navigate(['tap/cart'])
  }
  toMap(){
    this.route.navigate(['tap/map'])
  }
  toProfile(){
    this.route.navigate(['tap/profile'])
  }
}
