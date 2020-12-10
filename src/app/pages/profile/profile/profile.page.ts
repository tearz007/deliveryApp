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



  }

}
