import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SharedModule } from './shared/shared.module';
import { CommonModule } from '@angular/common';
import { ProductsModule } from './products/products.module';
import { CartComponent } from './carts/components/cart/cart.component';
import { CartsModule } from './carts/carts.module';




@NgModule({
  declarations: [
    AppComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    ProductsModule,
    SharedModule,
    CartsModule


  ],
  providers: [],

  bootstrap: [AppComponent]
})
export class AppModule { }
