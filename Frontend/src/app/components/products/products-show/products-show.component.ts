import { Component, OnInit, AfterViewInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { title } from "process";
import { AlertService } from "src/app/alert.service";
import { ProductService } from "src/app/services/product.service";
import Swiper from "swiper";

interface Product {
  id: number;
  name: string;
  amount: number;
  stock: number;
  category?: string;
  description?: string;
  image?: string[];
}

@Component({
  selector: "app-products-show",
  templateUrl: "./products-show.component.html",
  styleUrls: ["./products-show.component.css"],
})
export class ProductsShowComponent implements OnInit, AfterViewInit {
  constructor(
    private productService: ProductService,
    private alertSevice: AlertService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  message: string = "";
  defaultImage: string = "assets/default/default.svg";
  isDefaultImage: boolean = false;
  products: Product[] = [
    // { id: 1, name: "Product A", count: 15, amount: 250 },
    // { id: 2, name: "Product B", count: 7, amount: 120 },
    // { id: 3, name: "Product C", count: 20, amount: 340 },
  ];

  getProducts() {
    this.productService.getProducts().subscribe((res) => {
      // console.log(res);
      if (res.status) {
        // console.log(res.products);
        this.products = res.products;
        // this.products.forEach((product) => {
        // });
      } else {
        this.message = res.message;
        this.products = []; 
        // console.log(this.message);
      }
    });
    setTimeout(() => {
      document.querySelectorAll(".swiper-container").forEach((el) => {
        new Swiper(el as HTMLElement, {
          slidesPerView: 1,
          spaceBetween: 10,
          loop: false,
          autoplay: {
            delay: 3000,
            disableOnInteraction: false,
          },
          navigation: {
            nextEl: (el as HTMLElement).querySelector(
              ".swiper-button-next"
            ) as HTMLElement,
            prevEl: (el as HTMLElement).querySelector(
              ".swiper-button-prev"
            ) as HTMLElement,
          },
        });
      });
    }, 100);
  }

  ngOnInit() {
    this.getProducts();
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      document.querySelectorAll(".swiper-container").forEach((el) => {
        new Swiper(el as HTMLElement, {
          slidesPerView: 1,
          spaceBetween: 10,
          loop: false,
          autoplay: {
            delay: 3000,
            disableOnInteraction: false,
          },
          navigation: {
            nextEl: (el as HTMLElement).querySelector(
              ".swiper-button-next"
            ) as HTMLElement,
            prevEl: (el as HTMLElement).querySelector(
              ".swiper-button-prev"
            ) as HTMLElement,
          },
        });
      });
    }, 100);
  }

  // onEdit(id: number) {
  //   this.alertSevice.error("Function Under Progress! 😵");
  // }

  deleteProduct(id: number, product_name: string) {
    this.alertSevice
      .confirm(`Want to delete Product ${product_name} ?`)
      .then((res) => {
        if (res.isConfirmed) {
          this.productService.deleteProduct(id).subscribe((res: any) => {
            if (res.status) {
              this.alertSevice.success("Product Deleted Successfully!");
            } else {
              this.alertSevice.error("Product Not Deleted!");
            }
            this.getProducts();
          });
        } else {
          this.alertSevice.error("Product Delete Canceled!");
        }
      });
  }
  
  onEdit(name: string): void {
    this.router.navigate([`/products/edit/${name}`]);
  }
}
