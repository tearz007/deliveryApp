import { Component, OnInit } from '@angular/core';
import { DisplayService } from 'src/app/service/display/display.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.page.html',
  styleUrls: ['./card.page.scss'],
})
export class CardPage implements OnInit {
  cart = this.inforService.cart;
  constructor(private inforService: DisplayService) { }
  firebaseCard = []
  ngOnInit() {

       this.cart.forEach(a => {
      this.inforService.getCart(a.id, a.name).subscribe(firebaseData => {
        // this.firebaseCard.push(data.data())
        this.firebaseCard = [] 
        firebaseData.forEach(a=>{

          let data =a.payload.doc.data();
          data.id =a.payload.doc.id;

          var existItem = this.cart.find(x => x.id == data.id);

          if (existItem) {    
            this.firebaseCard.push(data)
          }
          else {
            // console.log("item Do exist");
          }     
        })
      })

      // console.log(this.firebaseCard)
    });
  }

  deleteItem(id){
    
    for (let i = 0; i < this.firebaseCard.length; i++) {
     if(id==this.firebaseCard[i].id){
       console.log(id)
      this.firebaseCard.splice(id, 1) 
     }
    }
   }

}
