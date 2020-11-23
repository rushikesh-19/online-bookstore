import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {


  constructor() { }  

  getOrderData(checkoutFormGroup){
    console.log("Customer: ");
    
    console.log(checkoutFormGroup.get('customer').value);
  }


}

