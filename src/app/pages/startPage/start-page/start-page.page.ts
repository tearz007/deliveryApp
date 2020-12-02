import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.page.html',
  styleUrls: ['./start-page.page.scss'],
})
export class StartPagePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  slideOpts = {
    initialSlide: 0,
    slidesPerView:2,
    speed: 400,
    spaceBetween:10,
    runCallbacksOnInit:true,
  };

}
