import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { BookService } from './service/book.service';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { BookCategoryComponent } from './components/book-category/book-category.component';
import { SearchComponent } from './components/search/search.component';
import { BookDetailsComponent } from './components/book-details/book-details.component';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { CartItemComponent } from './components/cart-item/cart-item.component';
import { CartDetailsComponent } from './components/cart-details/cart-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGaurd } from './service/auth.gaurd';
import { LogoutComponent } from './components/logout/logout.component';
import { CartService } from './service/cart.service';
import { CheckoutService } from './service/checkout.service';
import { TokenInterceptorService } from './service/token-interceptor.service';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { ThankyouComponent } from './components/thankyou/thankyou.component';
const routes: Routes = [
  {
    path:'thank-you',
    component: ThankyouComponent,
    canActivate:[AuthGaurd]
  },
  {
    path:'home',
    component: HomeComponent
  },
  {
    path:'logout',
    component: LogoutComponent
  },
  {
    path:'register',
    component:RegisterComponent
  },
  {
    path:'login',
    component: LoginComponent
  },
  {
    path:'checkout',
    component: CheckoutComponent,
    canActivate:[AuthGaurd]
  },
  { 
    path: 'cart-details',
    component: CartDetailsComponent,
    canActivate:[AuthGaurd]
  },
  {
    path: 'books/:id',
    component: BookDetailsComponent,
    canActivate:[AuthGaurd]
  },
  {
    path: 'books',
    component: BookListComponent,
    canActivate:[AuthGaurd]
  },
  {
    path: 'search/:keyword',
    component: BookListComponent,
    canActivate:[AuthGaurd]
  },
  {
    path: 'category/:id',
    component: BookListComponent,
    canActivate:[AuthGaurd]
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];
@NgModule({
  declarations: [
    AppComponent,
    BookListComponent,
    PageNotFoundComponent,
    BookCategoryComponent,
    SearchComponent,
    BookDetailsComponent,
    CartStatusComponent,
    CartItemComponent,
    CartDetailsComponent,
    CheckoutComponent,
    LoginComponent,
    RegisterComponent,
    LogoutComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    ThankyouComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    BookService,
    CartService,
    CheckoutService,
    AuthGaurd,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
