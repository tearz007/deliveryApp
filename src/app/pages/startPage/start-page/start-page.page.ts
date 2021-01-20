import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonInfiniteScroll, LoadingController, ModalController, ToastController } from '@ionic/angular';
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
  test=true
  cartLength
  cart = this.inforService.cart;
  data: any;

  dommy=[{name:''},{name:''},{name:''},{name:''},{name:''},{name:''},{name:''},{name:''}]
  constructor(public loadingController: LoadingController,public alertController: AlertController,public toastController: ToastController,private route: Router, public modalController: ModalController,private inforService:DisplayService,private loginService:LoginService ) { }

  async ngOnInit() {
  
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      // duration: 2000
    });
    await loading.present();
    // this.presentLoading()

     this.loginService.user$
     this.cartLength=this.inforService.cart.length;

          
     this.setCollection(this.inforService.collection)
     this.getC()

    this.inforService.getImgs().subscribe( firebaseData=>{
      this.imgs=[]
      firebaseData.forEach(a => {
        
        let data:any=a.payload.doc.data();
        data.id=a.payload.doc.id
        this.imgs.push(data)
      }); 

      console.log(this.imgs.length)
      loading.dismiss();
      console.log('Loading dismissed!'); 
    })
   
    
  }

  ionViewWillEnter() {
    setTimeout(() => {
      this.data = {
        'heading': 'Normal text',
        'para1': 'Lorem ipsum dolor sit amet, consectetur',
        'para2': 'adipiscing elit.'
      };
    }, 5000);
  }

  slideOpts = {
    initialSlide: 0,
    slidesPerView: 3,
    speed: 400,
    spaceBetween: 10,
    runCallbacksOnInit: true,
    loop:true,
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

  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      // duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');

    // dismiss()
  }

  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Item added to cart',
      duration: 500
    });
    toast.present();
  }

/* login*/


async presentAlertConfirm() {

  const alert = await this.alertController.create({
    cssClass: 'my-custom-class',
    header: 'User',
    message: 'Login or logout',
    buttons: [
      {
        text: 'Login',
        role: 'cancel',
        cssClass: 'secondary',
        handler: (blah) => {
          this.toLogin()
        }
      }, {
        text: 'Logout',
        handler: () => {
          console.log('Confirm Okay');
         
        }
      }
    ]
  });

  await alert.present();
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
      this.presentToast()
      // this.cartLength=this.inforService.cart.length;
    }
    console.log(this.inforService.cart)
  }



  gotoCart() {
    this.route.navigate(['tap/cart'])
  }
}
