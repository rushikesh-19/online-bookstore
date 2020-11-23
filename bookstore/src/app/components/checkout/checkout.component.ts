import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/service/cart.service';
import { CheckoutService } from 'src/app/service/checkout.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  checkoutFormGroup:FormGroup;
  cartItems: CartItem[] = [];
  totalPrice:number = 0;
  
  onlyCharacter = "^[A-Za-z]+$";
  phoneDigits = "^[0-9]{10}$";
  pincode = "^[0-9]{6}$";

  constructor(private _formBuilder: FormBuilder,
              private _cartService: CartService,
              private _checkoutService: CheckoutService,
              private _router : Router) { }

  ngOnInit(): void {
    this.cartDetails();
    this.checkoutFormGroup = this._formBuilder.group({
      customer: this._formBuilder.group({
        firstName: ['',[Validators.required,Validators.pattern(this.onlyCharacter)]],
        lastName: ['',[Validators.required,Validators.pattern(this.onlyCharacter)]],
        email: ['',Validators.required],
        phone: ['', [ Validators.required,Validators.pattern(this.phoneDigits)]]
      }),
      shippingAddress: this._formBuilder.group({
        street: ['',Validators.required],
        city: ['',Validators.required],
        pincode: ['',[Validators.required,Validators.pattern(this.pincode),Validators.minLength(5)]],
        state:['',Validators.required]
      }),
      billingAddress: this._formBuilder.group({
        street: ['',Validators.required],
        city: ['',Validators.required],
        pincode: ['',[Validators.required,Validators.pattern(this.pincode),Validators.minLength(5)]],
        state:['',Validators.required]
        
      })
    })

  }

  getCustomer():FormGroup{
    return this.checkoutFormGroup.controls.customer as FormGroup;
  }

  getShippingAddress():FormGroup{
    return this.checkoutFormGroup.controls.shippingAddress as FormGroup;
  }

  getBillingAddress():FormGroup{
    return this.checkoutFormGroup.controls.billingAddress as FormGroup;
  }

  onSubmit(){
    console.log('purchase book');
      
    console.log(this.checkoutFormGroup.get('customer').value);
    console.log(this.checkoutFormGroup.get('shippingAddress').value);
    console.log(this.checkoutFormGroup.get('billingAddress').value);
    this._checkoutService.getOrderData(this.checkoutFormGroup);
    this._router.navigate(['/thank-you'])
    
  }

  copyShippingAddressToBillingAddress(event){
    
    if (event.target.checked) {     
      this.checkoutFormGroup.controls.billingAddress
      .setValue(this.checkoutFormGroup.controls.shippingAddress.value);
    } else {
      this.checkoutFormGroup.controls.billingAddress.reset();
    }
  }

  cartDetails(){
    this.cartItems = this._cartService.cartItems;
    this._cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    )
    this._cartService.calculateTotalPrice();
  }


}