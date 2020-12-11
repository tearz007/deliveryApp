import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/service/login/login.service';
import { UserInforService } from 'src/app/service/userInfor/user-infor.service';



@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  // person:[{name:'',email:'',phoneNumber:0,password:''}]
  name:string;
  email:string;
  phoneNumber:number;
  password:string;


  constructor(private route:Router,private userService:UserInforService,private loginService:LoginService) { }

  ngOnInit() {
  }

  register(){
    let person={name:this.name,email:this.email,phoneNumber:this.phoneNumber,password:this.password}
    //this.userService.setUser(person)
    this.loginService.createAcc(this.email,this.password).then(() => {
     alert("Account is created")
      this.userService.setUser(person)
      this.route.navigate(['login'])
    }).catch(e => {
      alert(e.message)
    })

  }

}
