import { Component, OnInit } from '@angular/core';
import { DisplayService } from 'src/app/service/display/display.service';
import { UserInforService } from 'src/app/service/userInfor/user-infor.service';
import firebase from 'firebase/app'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {


  collect
  profile = []
  _uid;
  constructor(private inforService: DisplayService, private userService: UserInforService) {
    this._uid=this.userService.currentUser()
   }

  ngOnInit() {
    this.userService.setUserProfile().subscribe(userprofile => {
      this.profile = []
      userprofile.forEach(a => {
        var data: any = a.payload.doc.data()
        data.id = a.payload.doc.id;

             
        if(this._uid==data.id){
          this.profile.push(data)
        } 
      });

      this.profile.forEach(e => {
        console.log(e)
      });
    })
  }



}
