import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.component.css"],
})
export class DashboardComponent implements OnInit {
  ngOnInit() {}

  userName: string | null = "";

  constructor(private authService: AuthService, private router: Router) {
    // this.userName = this.authService.getUserName();
    // console.log('object')
  }

  logout() {
    this.authService.logout();
    this.router.navigate(["/login"]);
  }
}
