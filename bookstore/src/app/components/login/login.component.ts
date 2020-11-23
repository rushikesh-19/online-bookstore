import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/common/user';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user = new User();
  invalidLogin = false;

  ngOnInit(): void {
  }

  constructor(private _loginService : AuthenticationService, 
              private _router : Router) { }

    checkLogin(){
      (this._loginService.loginUser(this.user).subscribe(
        data => {
          this._router.navigate(['/books'])
          this.invalidLogin = false
        },
        error => {
          this.invalidLogin = true
        }
      )
      );
    }

}