import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DisplayService } from 'src/app/service/display/display.service';

@Component({
  selector: 'app-model',
  templateUrl: './model.page.html',
  styleUrls: ['./model.page.scss'],
})
export class ModelPage implements OnInit {

fireData=[]
collect:string
  constructor(public modalCtrl: ModalController,private inforService:DisplayService) { }

  ngOnInit() {
    this.collect=this.inforService.collection
    this.inforService.getCategories(this.collect).subscribe(firebaseData=>{
      this.fireData=[]
      firebaseData.forEach(a => {
        let data:any=a.payload.doc.data()
        data.id=a.payload.doc.id
        this.fireData.push(data)
      });
    })

  }

  dismiss() {

      this.modalCtrl.dismiss({
        'dismissed': true
      }); 
  }

}
