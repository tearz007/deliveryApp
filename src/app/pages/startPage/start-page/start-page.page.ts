import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonInfiniteScroll, ModalController } from '@ionic/angular';
import { DisplayService } from 'src/app/service/display/display.service';
import { LoginService } from 'src/app/service/login/login.service';
import { ModelPage } from '../../model/model/model.page';


@Component({
  selector: 'app-start-page',
  templateUrl: './start-page.page.html',
  styleUrls: ['./start-page.page.scss'],
})
export class StartPagePage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  imgs=[]
  fireData = []
  collect: string
  
  cartLength
  cart = this.inforService.cart;
  constructor(private route: Router, public modalController: ModalController,private inforService:DisplayService,private loginService:LoginService ) { }

  ngOnInit() {
     this.loginService.user$
     this.cartLength=this.inforService.cart.length;
     
     this.setCollection(this.inforService.collection)
     this.getC()

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
    slidesPerView: 2.5,
    speed: 400,
    spaceBetween: 10,
    runCallbacksOnInit: true,
  };

  slide2 = {
    initialSlide: 0,
    slidesPerView: 1.4,
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

  setgetter(name){
    this.setCollection(name)
    this.getC()
  }
  

  setCollection(name){
   this.inforService.setCollection(name)
  }


  getC(){
    this.cartLength=this.inforService.cart.length;
    this.collect = this.inforService.collection
    this.inforService.getsub(this.collect).subscribe(firebaseData => {
      this.fireData = []
      firebaseData.forEach(a => {
        let data: any = a.payload.doc.data()
        data.id = a.payload.doc.id
        this.fireData.push(data)
        console.log('gsgs')
      });
    })
  }

  addToCart(_id) {
    let product = { id:_id, name: this.collect,quntity:1 }
    
    var existItem = this.cart.find(x => x.id == _id);

    if (existItem) {
      console.log("item already exist");
    }
    else {
      this.inforService.setCart(product);
      this.cartLength=this.inforService.cart.length;
    }
  }

  gotoCart() {
    this.route.navigate(['tap/cart'])
  }
}
