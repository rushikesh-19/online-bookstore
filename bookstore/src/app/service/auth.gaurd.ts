import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { AuthenticationService } from './authentication.service'

@Injectable({
  providedIn: 'root'
})
export class AuthGaurd implements CanActivate {
  constructor(private _auth:AuthenticationService,
    private _route:Router){}

canActivate():boolean{

  if(this._auth.isUserLoggedIn()){
  return true;
  } else{
  this._route.navigate(['/login'])
  return false;
  }
}
}
