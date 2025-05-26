import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AuthService } from "./auth.service";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";

export interface Product {
  id: number;
  name: string;
  amount: number;
  stock: number;
  category?: string;
  description?: string;
  image?: any[];
}

@Injectable({
  providedIn: "root",
})
export class ProductService {
  private products: Product[] = [
    // { id: 1, name: "Product A", amount: 250, stock: 15 },
    // { id: 2, name: "Product B", amount: 120, stock: 7 },
    // { id: 3, name: "Product C", amount: 340, stock: 20 },
  ];

  private base_url = environment.API_URL;
  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHttpOptions(
    auth_token: string | null = null,
    contentType: string = "application/json"
  ) {
    const headers: any = {
      // "Content-Type": contentType,
    };

    if (auth_token) {
      headers["Authorization"] = `Bearer ${auth_token}`; // Important!
    }

    return { headers };
  }

  getProducts(): Observable<any> {
    const apiUrl = `${this.base_url}/products`;
    const token = localStorage.getItem("auth_token");
    return this.http.get<{ products: Product[] }>(
      apiUrl,
      this.getHttpOptions(token)
    );
  }

  getProductById(id: number): Observable<Product> {
    const apiUrl = `${this.base_url}/products/${id}`;
    const token = localStorage.getItem("auth_token");
    return this.http.get<Product>(apiUrl, this.getHttpOptions(token));
    // return this.products.find((p) => p.id === id);
  }

  getProductByName(name: string): Observable<Product> {
    const apiUrl = `${this.base_url}/get_product_by_name/${name}`
    const token = localStorage.getItem("auth_token");
    return this.http.get<Product>(apiUrl, this.getHttpOptions(token));
    // return this.products.find((p) => p.id === id);
  }

  addProduct(product: any): Observable<any> {
    const apiUrl = `${this.base_url}/add_product`;
    const token = localStorage.getItem("auth_token");

    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('category', product.category);
    formData.append('description', product.description);
    formData.append('amount', product.amount);
    formData.append('stock', product.stock);

    // if(product.image.length){
    //   product.image.forEach((file: File) => {
    //     formData.append('image[]', file);
    //   });
    // }


    const headers = {
      Authorization: `Bearer ${token}`,
    };

    return this.http.post(apiUrl, formData, { headers });
  }


  updateProduct(product: any, id: number): Observable<Product> {
    const apiUrl = `${this.base_url}/update_product/${id}`;
    const token = localStorage.getItem("auth_token");

    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('category', product.category);
    formData.append('description', product.description);
    formData.append('amount', product.amount);
    formData.append('stock', product.stock);

    if (product.image && Array.isArray(product.image)) {
      product.image.forEach((file: File) => {
        formData.append('image[]', file);
      });
    }

    return this.http.post<Product>(apiUrl, formData, this.getHttpOptions(token));
  }

  deleteProduct(id: number): Observable<void> {
    const apiUrl = `${this.base_url}/delete_product/${id}`;
    const token = localStorage.getItem("auth_token");
    return this.http.delete<void>(apiUrl, this.getHttpOptions(token));
  }

  deleteProductImage(product_id: number, image_id: number): Observable<void> {
    const apiUrl = `${this.base_url}/delete_image/${product_id}/${image_id}`;
    const token = localStorage.getItem("auth_token");
    return this.http.delete<void>(apiUrl, this.getHttpOptions(token));
  }

  uploadProductImages(product_id: number, data: any){
    const apiUrl = `${this.base_url}/upload_images/${product_id}/${true}`;
    const token = localStorage.getItem("auth_token");
    return this.http.post<void>(apiUrl, data, this.getHttpOptions(token));
  }

  // updateProduct(updatedProduct: Product): boolean {
  //   const index = this.products.findIndex((p) => p.id === updatedProduct.id);
  //   if (index !== -1) {
  //     this.products[index] = updatedProduct;
  //     return true;
  //   }
  //   return false;
  // }

  // deleteProduct(id: number): boolean {
  //   const index = this.products.findIndex((p) => p.id === id);
  //   if (index !== -1) {
  //     this.products.splice(index, 1);
  //     return true;
  //   }
  //   return false;
  // }
}
