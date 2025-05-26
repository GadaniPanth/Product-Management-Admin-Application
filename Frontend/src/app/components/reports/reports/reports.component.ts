import { Component, OnInit } from "@angular/core";
import { Product, ProductService } from "src/app/services/product.service";

@Component({
  selector: "app-reports",
  templateUrl: "./reports.component.html",
  styleUrls: ["./reports.component.css"],
})
export class ReportsComponent implements OnInit {
  products: Product[] = [];

  countData: any[] = [];
  amountData: any[] = [];

  view: any[] = [700, 400];
  colorScheme = { domain: ["#5AA454", "#A10A28", "#C7B42C", "#AAAAAA"] };

  showXAxis = true;
  showYAxis = true;
  gradient = true;
  showLegend = false;
  showXAxisLabel = true;
  showYAxisLabel = true;
  xAxisLabel = "Products";
  yAxisLabelCount = "Count";
  yAxisLabelAmount = "Amount";

  constructor(private productService: ProductService) {}
  message: string = "";

  ngOnInit() {
    this.productService.getProducts().subscribe((res) => {
      if (res.status) {
        // console.log(res.products);
        this.products = res.products;
        this.countData = this.products
          .filter(
            (p) => p.stock !== undefined && p.stock !== null && !isNaN(p.stock)
          )
          .map((p) => ({
            name: p.name,
            value: Number(p.stock) || 0,
          }));

        console.log(this.countData);
        this.amountData = this.products
          .filter(
            (p) =>
              p.amount !== undefined && p.amount !== null && !isNaN(p.amount)
          )
          .map((p) => ({
            name: p.name,
            value: Number(p.amount) || 0,
          }));
      } else {
        this.message = res.message;
      }
    });
  }
}
