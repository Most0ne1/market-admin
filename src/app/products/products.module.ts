import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllProductsComponent } from './components/all-products/all-products.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AllProductsComponent,

  ],
  imports: [
    CommonModule,
    HttpClientModule,
    SharedModule
  ]
})
export class ProductsModule { }
