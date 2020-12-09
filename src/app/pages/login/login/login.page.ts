import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/service/login/login.service';
import { UserInforService } from 'src/app/service/userInfor/user-infor.service';
import { user } from 'src/models/user';
import firebase from 'firebase/app'

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username
  password
  profile=[]
  user$: Observable<user>
  constructor(private route: Router, public loadingController: LoadingController, private login: LoginService, private userInfor: UserInforService) { }
  ngOnInit() {

  }

 
  emailLogin() {
    this.login.userLogin(this.username, this.password).then(() => {
      alert("signed in")
      this.route.navigate(['tap/start-page'])
    }).catch(e => {
      alert(e.message)
    })
  }

  googleLogin() {
    this.login.gmailLogin().then(() => {
      alert("signed in with google")
      this.userInfor.createCarrentUser()
    }).catch(e => {
      alert(e.message)
    })
  }


  facebookLogin() {
    this.login.facebookLogin().then(() => {
      alert("facebook sign in")
      this.userInfor.createCarrentUser()
    }).catch(e => {
      alert(e.message)
    })
  }
  phoneLogin() {
   
  }
 
  
 

  toRegistration() {
    this.route.navigate(['register'])
  }

  toMenu() {
    this.route.navigate(['menu'])
  }
  toStart() {
    this.route.navigate(['tap'])
   }

}
