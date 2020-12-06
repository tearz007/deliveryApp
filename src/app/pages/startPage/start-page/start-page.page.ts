import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonInfiniteScroll, ModalController } from '@ionic/angular';
import { DisplayService } from 'src/app/service/display/display.service';
import { ModelPage } from '../../model/model/model.page';


@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.page.html',
  styleUrls: ['./start-page.page.scss'],
})
export class StartPagePage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  imgs=[]
  constructor(private route: Router, public modalController: ModalController,private inforService:DisplayService) { }

  ngOnInit() {
    this.inforService.getImgs().subscribe(firebaseData=>{
      this.imgs=[]
      firebaseData.forEach(a => {
        
        let data:any=a.payload.doc.data();
        data.id=a.payload.doc.id
        this.imgs.push(data)
      });

     
    })
   
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
   
  async presentModal(name) {
    this.setCollection(name)
    const modal = await this.modalController.create({
      component: ModelPage,
      cssClass: 'my-custom-class',

    });
    return await modal.present();
  }

  setCollection(name){
   this.inforService.setCollection(name)
  }


}
/*
.subscribe(firebaseData=>{

      firebaseData.forEach(a => {
        this.imgs=[]
        let data:any=a.payload.doc.data();
        data=a.payload.doc.id
        this.imgs.push(data)
        
      });
    })
*/