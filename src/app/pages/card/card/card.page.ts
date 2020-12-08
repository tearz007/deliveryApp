import { Component, OnInit } from '@angular/core';
import { DisplayService } from 'src/app/service/display/display.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.page.html',
  styleUrls: ['./card.page.scss'],
})
export class CardPage implements OnInit {

  constructor(private inforService: DisplayService) { }
  firebaseCard = []
  ngOnInit() {
    /* this.inforService.getCart().subscribe(data => {
       this.firebaseCard.push(data.data())
       // console.log(data.data())
     })*/
    let cart = this.inforService.cart; 
    cart.forEach(a => {
      
      this.firebaseCard.forEach(i => {
        if (a.id===i.id) {
        console.log('same id')
        }
      });
      this.inforService.getCart(a.id,a.name).subscribe(data => {
        this.firebaseCard.push(data.data())
      })
    });
  }

}
