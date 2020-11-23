import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { User } from 'src/app/common/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(public loginService:AuthenticationService) { }

  username:string = sessionStorage.getItem('username')
  ngOnInit(): void {
    
  }

}
