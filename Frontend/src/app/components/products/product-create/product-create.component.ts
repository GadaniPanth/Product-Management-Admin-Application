import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertService } from 'src/app/alert.service';
import { ProductService, Product } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {
  // productForm!: FormGroup;
  submitted = false;
  isEditForm: boolean = false;
  errorMessage = '';
  mediaArray: any[] = [];
  mediaIdArray: any[] = [];
  isDefaultImage: boolean = false;
  defaultImage: string = "assets/default/default.svg"
  // tempArray: File[] = [];
  name: string = null;
  formHead: string = 'Create Product';
  formBtn: string = 'Create';
  productForm: FormGroup = new FormGroup({
    name: new FormControl(''),
    amount: new FormControl(null),
    stock: new FormControl(null),
    category: new FormControl(''),
    description: new FormControl(''),
  });
  product_id: number = null;

  @ViewChild('imageInput',{static: false}) imageInput!: ElementRef;

  constructor(
    private productService: ProductService,
    private router: Router,
    private alertService: AlertService,
    private route: ActivatedRoute
  ) {
    this.name = this.route.snapshot.paramMap.get('name');
    // console.log(this.name);
    
    if (this.name) {
      this.name = this.route.snapshot.params.name;
      this.formHead = 'Edit Product';
      this.formBtn = 'Update';
      this.isEditForm = true;

      this.productService.getProductByName(this.name).subscribe((res: any) => {
        // console.log(res);
        if (res.status) {
          this.productForm = new FormGroup({
            name: new FormControl(res.product.name),
            amount: new FormControl(res.product.amount),
            stock: new FormControl(res.product.stock),
            category: new FormControl(res.product.category),
            description: new FormControl(res.product.description)
          });
          this.product_id = res.product.id;
          if(res.product.image.length == 0){
            this.isDefaultImage = true;
          }
          if (res.product.image && res.product.image.length) {
            this.mediaArray = res.product.image;
          }


          // console.log(this.mediaArray.length);

          if (res.product.image_id && res.product.image_id.length) {
            this.mediaIdArray = res.product.image_id;
          }

          // console.log(this.mediaIdArray);
        } else {
          this.alertService.error("No Product Found!");
          this.router.navigate(['/products']);
        }
      });
    }
  }

  ngOnInit(): void {
    if (!this.name) {
      this.productForm = new FormGroup({
        name: new FormControl('', [Validators.required, Validators.minLength(3)]),
        amount: new FormControl(null, [Validators.required]),
        stock: new FormControl(null, [Validators.required]),
        category: new FormControl('', [Validators.required]),
        description: new FormControl('', [Validators.required])
      });
    }
  }

  get f() {
    return this.productForm.controls;
  }

  onMediaChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const files = Array.from(input.files);

      if (this.mediaIdArray.length > 0) {
        this.productService.deleteProductImage(this.product_id, this.mediaIdArray[0]).subscribe((res) => {
          // console.log('Deleted existing image:', res);
        });
      }

      files.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.mediaArray.push(e.target.result);
        };
        reader.readAsDataURL(file);
      });

      this.isDefaultImage = false;

      const formData = new FormData();
      files.forEach((file) => {
        formData.append('image[]', file);
      });

      this.productService.uploadProductImages(this.product_id, formData).subscribe(
        (res: any) => {
          console.log('Upload response:', res);
          if(res.status){
            this.isDefaultImage = false;
            this.alertService.success("Added Image!");
          }else {
            this.alertService.error("Image Upload Faild!"); 
          }
        }
      );
    }
  }

  // onMediaChange(event: Event): void {
    // const input = event.target as HTMLInputElement;
    // if (input.files && input.files.length > 0) {
    //   const files = Array.from(input.files);
    //   files.forEach((file) => {
    //     const reader = new FileReader();
    //     reader.onload = (e: any) => {
    //       this.mediaArray.push(e.target.result);
    //       this.tempArray.push(file);
    //     };
    //     reader.readAsDataURL(file);
    //   });
    // }
  // }

  // removeMedia(index: number): void {
  //   this.mediaArray.splice(index, 1);
  //   this.tempArray.splice(index, 1);
  // }

  removeMedia(index: number): void {
    this.alertService.confirm("Want to delete Image?").then((res) => {
      if (res.isConfirmed) {
        this.productService.deleteProductImage(this.product_id, this.mediaIdArray[index]).subscribe((res) => {
          // console.log(res);
          this.alertService.success("Deleted Image!");

          this.mediaArray.splice(index, 1);
          this.mediaIdArray.splice(index, 1);

          if(!this.mediaArray.length){
            this.isDefaultImage = true;
          }
        });
      } else {
        this.alertService.info("Image Not deleted!");
      }
    });
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.productForm.invalid) {
      this.errorMessage = 'Please fill out this form.';
      return;
    }

    const newProduct: Product = {
      ...this.productForm.value,
      // image: [...this.tempArray]
    };

    // console.log(newProduct);

    if(this.name){
      this.productService.updateProduct(newProduct, this.product_id).subscribe((res: any) => {
        // console.log(res);
        if (res.status) {
          this.alertService.success("Product Updated!");
          this.productForm.reset();
          // this.mediaArray = [];
          // this.tempArray = [];
          this.errorMessage = '';
          this.router.navigate(['/products']);
        } else {
          this.alertService.error(res.message, "Updation Failed!");
        }
      });
    }else{
      this.alertService.confirm("Want to add Images?", null).then((res)=>{
        if(res.isConfirmed){
          this.productService.addProduct(this.productForm.value).subscribe((res) => {
            console.log(res);
            if (res.status) {
              this.alertService.success("Product Created!");
              this.productForm.reset();
              // this.mediaArray = [];
              // this.tempArray = [];
              this.errorMessage = '';
              this.router.navigate([`/products/edit/${res.product_name}`]);
            } else {
              // console.log(res);
              if(res.message && res.message.includes('Duplicate entry')){
                this.alertService.error("Product Already Exists.", "Creation Failed!");
              }
            }
          });
        }else {
          this.productService.addProduct(this.productForm.value).subscribe((res) => {
            if (res.status) {
              this.alertService.success("Product Created!");
              this.productForm.reset();
              // this.mediaArray = [];
              // this.tempArray = [];
              this.errorMessage = '';
              this.router.navigate([`/products`]);
            } else {
              // console.log(res);
              if(res.message && res.message.includes('Duplicate entry')){
                this.alertService.error("Product Already Exists.", "Creation Failed!");
              }
            }
          });
        }
      });
    }

  }
}
