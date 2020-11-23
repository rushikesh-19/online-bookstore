import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../common/user';

export class Msg{
  constructor(
    public message:string,
   ) {}
}

@Injectable({
  providedIn: 'root'
})
export class HttpClientService {

  constructor(private httpClient:HttpClient) {     }

     user:User;

     getMessage()
     {
      this.user.email;
      this.user.password;
       const headers = new HttpHeaders({ Authorization: 'Basic ' + btoa("username" + ':' + "password") });
          return this.httpClient.get<any>('http://localhost:8080/hello',{headers});
     }
   
   }