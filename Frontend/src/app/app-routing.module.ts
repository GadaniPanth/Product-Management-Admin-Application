import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { DashboardComponent } from "./components/admin/dashboard/dashboard.component";
import { ProductsShowComponent } from "./components/products/products-show/products-show.component";
import { ProductCreateComponent } from "./components/products/product-create/product-create.component";
import { ReportsComponent } from "./components/reports/reports/reports.component";
import { LoginComponent } from "./components/login/login.component";

import { AuthGuard } from "./guards/auth.guard";
import { RoleGuard } from "./guards/role.guard";

const routes: Routes = [
  { path: "", redirectTo: "/login", pathMatch: "full" },
  { path: "login", component: LoginComponent },

  // Admin-only dashboard
  {
    path: "admin",
    component: DashboardComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: "admin" },
  },
  // {
  //   path: "dashboard",
  //   component: DashboardComponent,
  //   canActivate: [AuthGuard],
  // },

  // Product routes
  {
    path: "products",
    component: ProductsShowComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "products/create",
    component: ProductCreateComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: "admin" },
  },
  {
    path: "products/edit/:name",
    component: ProductCreateComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { role: "admin" },
  },

  // Reports
  {
    path: "reports",
    component: ReportsComponent,
    canActivate: [AuthGuard],
  },

  // Wildcard redirect to login
  { path: "**", redirectTo: "/login" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
