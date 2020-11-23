import { Injectable } from '@angular/core';
import { HttpRequest, HttpInterceptor, HttpHandler } from '@angular/common/http';
const TOKEN_HEADER_KEY = 'Authorization';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {

    let authReq = req
    const token = sessionStorage.getItem('token')

    if (sessionStorage.getItem('username') && sessionStorage.getItem('token') != null ) {
      authReq = req.clone({
        headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer '+ token)});
      }
      return next.handle(authReq)
    }
  }