import { Component, OnInit } from '@angular/core';
import { DisplayService } from 'src/app/service/display/display.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {


  collect
  fireData = []

  constructor(private inforService: DisplayService) { }

  ngOnInit() {

    this.collect = this.inforService.collection
    this.inforService.getsub(this.collect).subscribe(firebaseData => {
      this.fireData = []
      firebaseData.forEach(a => {
        let data: any = a.payload.doc.data()
        data.id = a.payload.doc.id
        this.fireData.push(data)
      });

      this.fireData.forEach(c => {
        console.log(c)
      });
    })

  

  }

}
