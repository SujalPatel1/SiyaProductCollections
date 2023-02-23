import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { Store } from './services/store.services';
import router from './router';

import { AuthActivator } from './services/authActivator.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorHandlerService } from './services/error-handler.service';
import { MenuComponent } from './menu/menu.component';
import { AuthenticationService } from './services/authentication.service';
import { ProductListView } from './pages/shop/views/productListView.component';
import { CartView } from './pages/shop/views/cartView.component';
import { Shop } from './pages/shop/shop.component';
import { Checkout } from './pages/checkout/checkout.component';
import { Login } from './pages/login/login.component';
import { Register } from './pages/register/register.component';
import { CouponView } from './pages/checkout/views/coupon.component';
import { AddressView } from './pages/checkout/views/address.component';
import { OrderPage } from './pages/order/order.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { FooterComponent } from './footer/footer.component';
import { FilterProductView } from './pages/shop/views/filterProductView.component';

@NgModule({
  declarations: [
        AppComponent,
        ProductListView,
        CartView,
        Shop,
        Checkout,
        Login,
        Register,
        MenuComponent,
        AddressView,
        CouponView,
        OrderPage,
        FooterComponent,
        FilterProductView
  ],
  imports: [
      BrowserModule,
      HttpClientModule,
      router,
      FormsModule,
      ReactiveFormsModule,
      MatDialogModule,
      BrowserAnimationsModule
  ],
  providers: [
      Store,
      AuthActivator,
      {
          provide: HTTP_INTERCEPTORS,
          useClass: ErrorHandlerService,
          multi: true
      },
      AuthenticationService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
