import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { LoginService } from 'src/app/service/login/login.service';
import { UserInforService } from 'src/app/service/userInfor/user-infor.service';
import { user } from 'src/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username
  password

  user$: Observable<user>
  constructor(private route: Router, public loadingController: LoadingController, private login: LoginService, private userInfor: UserInforService) { }
  ngOnInit() {

  }

  createAcc() {
    this.login.createAcc(this.username, this.password).then(() => {
      alert("Account is created")
     

    }).catch(e => {
      alert(e.message)
    })
  }


  emailLogin() {
    this.login.userLogin(this.username, this.password).then(() => {
      alert("signed in")

      this.userInfor.createUser()
    }).catch(e => {
      alert(e.message)
    })
  }

  googleLogin() {
    this.login.gmailLogin().then(() => {
      alert("signed in with google")
    }).catch(e => {
      alert(e.message)
    })
  }
  test() {
   this.userInfor.test()
  }


  facebookLogin() {
    alert("facebook");
  }
  phoneLogin() {
    alert("phone");
  }

  toRegistration() {
    this.route.navigate(['regiter'])
  }

  toMenu() {
    this.route.navigate(['menu'])
  }

}
