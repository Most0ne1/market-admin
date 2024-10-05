import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductsService } from 'src/app/products/services/products.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartProducts:any[] = [];
  products:any[] = [];

  form!:FormGroup;
  details:any;
constructor(private service:CartService ,private build:FormBuilder , private productService:ProductsService){}

  ngOnInit(){
this.form=this.build.group({
  start:[''],
  end:['']
});
this.getAllCarts()
  }



  getAllCarts(){
    this.service.getAllCarts().subscribe((res:any)=>{
      this.cartProducts=res
    })
  }


  applyFilter(){
let date=this.form.value


      this.service.getAllCarts(date).subscribe((res:any)=>{
        this.cartProducts=res})

  }

  deleteCart(id:number){
this.service.deleteCart(id).subscribe(res=>{
  this.getAllCarts();
  alert('delete success')})
  }
  view(index: number) {
    this.products = []
    this.details = this.cartProducts[index];

    if (this.details?.products) {
      for (let product of this.details.products) {
        if (product?.productId) {
          this.productService.getPById(product.productId).subscribe((res: any) => {
            if (res) {
              // Ensure `this.products` is treated as an array and can be used with `.push`
              this.products.push({ item: res, quantity: product.quantity });
            }
          });
        } else {
          console.error('Product or productId is undefined:', product);
        }
      }
    } else {
      console.error('Details or products are undefined:', this.details);
    }

    console.log(this.details);
  }



  // this.cartProducts=JSON.parse(localStorage.getItem('cart')!)
  // localStorage.setItem('cart',JSON.stringify(this.cartProducts));
  // removeItem(item: any): void {
  //   const index = this.cartProducts.indexOf(item);
  //   if (index > -1) {
  //     this.cartProducts.splice(index, 1);
  //   }
  //   localStorage.setItem('cart' ,JSON.stringify(this.cartProducts));
  //   this.getTotalPrice();
  // }






}
