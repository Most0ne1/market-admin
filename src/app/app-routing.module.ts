import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllProductsComponent } from './products/components/all-products/all-products.component';
import { CartComponent } from './carts/components/cart/cart.component';

const routes: Routes = [
  {path:'products',component:AllProductsComponent},
  {path:'cart',component:CartComponent},
  {path:'**',redirectTo:'cart',pathMatch:'full'  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
