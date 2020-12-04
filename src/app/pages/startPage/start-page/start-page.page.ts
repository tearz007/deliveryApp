import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonInfiniteScroll, ModalController } from '@ionic/angular';
import { ModelPage } from '../../model/model/model.page';


@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.page.html',
  styleUrls: ['./start-page.page.scss'],
})
export class StartPagePage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  constructor(private route: Router, public modalController: ModalController) { }

  ngOnInit() {
  }

  slideOpts = {
    initialSlide: 0,
    slidesPerView: 1.1,
    speed: 400,
    spaceBetween: 10,
    runCallbacksOnInit: true,
  };

  toLogin() {
   this.route.navigate(['login'])
  }
  toStart() {
    this.route.navigate(['tap'])
   }
   

  async presentModal() {
    const modal = await this.modalController.create({
      component: ModelPage,
      cssClass: 'my-custom-class',

    });
    return await modal.present();
  }


}
