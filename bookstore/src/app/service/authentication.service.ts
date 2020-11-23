import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private httpClient:HttpClient) { }
     private _registerUrl = "http://localhost:8080/register"
     private _loginUrl = "http://localhost:8080/authenticate"

     registerUser(user){
      return this.httpClient.post<any>(this._registerUrl,user);
    }
  
    loginUser(user){
      var email = user.email;
      var password = user.password;      
      return this.httpClient.post<any>(this._loginUrl,{email,password}).pipe(
        map(
          userData =>{
              sessionStorage.setItem('username',email);
              sessionStorage.setItem('token',userData.token);
          })
      );
    }
  
    isUserLoggedIn() {
      let username = sessionStorage.getItem('username')
      let token = sessionStorage.getItem('token')
      return !(username === null || token == null)
    }
  

  logOut() {
    sessionStorage.removeItem('username')
    sessionStorage.removeItem('token')
  }

}