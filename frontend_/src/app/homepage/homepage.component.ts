import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  username:string = "";
  pkey:string = "";
  constructor(private _user:UserService, private _router:Router) { 
    this._user.user()
    .subscribe(
      data=>this.setUsername(data),
      error=>this._router.navigate(['./login'])
    )
  }

  setUsername(data){
    this.username = data.username;
    this.pkey = data.pkey;
  }

  ngOnInit() {
  }

  logout(){
    this._user.logout()
    .subscribe(
      data=>{console.log(data);this._router.navigate(['/login'])},
      error=>console.error(error)
    )
  }

}
