import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/common/user';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user = new User();
  invalidRegister = false;
  constructor(private _registerService : AuthenticationService,
              private _router : Router) { }

  ngOnInit(): void {
  }

  registerUser(){
    this._registerService.registerUser(this.user).subscribe(
      data => {
        this._router.navigate(['/login'])
      },
      err => this.invalidRegister = true
    )
  }

}
