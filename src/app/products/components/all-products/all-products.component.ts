import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { Product } from '../../models/Product';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.scss']
})
export class AllProductsComponent implements OnInit {
  products:Product[]=[];
  categories:string[]=[];
  loading:boolean=false;
  base64: any = '';
  form!: FormGroup


  constructor(private service:ProductsService, private build:FormBuilder) { }

  ngOnInit(): void {
    this.form = this.build.group({
      title: ['', [Validators.required]],
      price: ['', [Validators.required]],
      description: ['', [Validators.required]],
      image: ['', [Validators.required]],
      category: ['', [Validators.required]]
    });


    this.getProducts();
    this.getCategories()
  }
  toggleLoading() {
    this.loading = !this.loading;
  }
  getProducts(){
    this.toggleLoading();
    this.service.getAllProducts().subscribe((res:any) =>{
      this.products = res;
       this.toggleLoading();
    },error=>{
       this.toggleLoading();
      ;alert(error.message);
      })
  };
  getCategories() {
     this.toggleLoading();
    this.service.getAllCategories().subscribe(
      (res: any) => {
        this.categories = res;

         this.toggleLoading();
      },
      (error) => {
         this.toggleLoading();
        console.error('Error occurred:', error);
        alert('Error: ' + error.message);
      }
    );
  }


  getSelectedCategory(event: any) {
    this.form.get('category')?.setValue(event.target.value)
    console.log(this.form);

  }

  getImagePath(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.base64 = reader.result;
        this.form.get('image')?.setValue( this.base64);
      };
      reader.onerror = error => {
        console.error('Error reading file:', error);
      };
    }
  }
  addProduct() {
    const model =this.form.value;
    this.service.createProduct(model).subscribe(res=>{
      alert('successfull adding')
    })
    console.log(this.form);


  }
  update(item:any){
    // this.form.get('category')?.setValue(item.category);
    // this.form.get('title')?.setValue(item.title);
    // this.form.get('price')?.setValue(item.price);
    // this.form.get('description')?.setValue(item.description);
    // this.form.get('image')?.setValue(item.image);
    this.base64=item.image

    this.form.patchValue({
      category:item.category,
      title:item.title,
      price:item.price,
      description:item.description,
      image:item.image
    })
    console.log(this.form);
  }
  resetForm(){
    this.form.patchValue({
      category: '' ,
      title:'' ,
      price:'',
      description:'',
      image: ''
    })
  }


}
