import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "src/app/services/auth.service";
import { NgForm } from "@angular/forms";
import { AlertService } from "src/app/alert.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {
  email = "";
  password = "";
  errorMessage = "";

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    if (localStorage.getItem("auth")) {
      this.router.navigate(["admin"]);
    }
  }

  onSubmit(loginForm: NgForm): void {
    this.errorMessage = "";

    if (!loginForm.valid) {
      Object.values(loginForm.controls).forEach((control) => {
        control.markAsTouched();
      });
      return;
    }

    this.authService.login(this.email, this.password).subscribe(
      (res: any) => {
        if (res.status) {
          this.authService.auth_token_glob = res["auth_token"];
          localStorage.setItem("auth", "true");
          localStorage.setItem("auth_token", res["auth_token"]);
          localStorage.setItem("userEmail", res.admin_details.email);
          this.alertService.success("Logged In!");
          this.router.navigate(["/admin"]);
        } else {
          // this.errorMessage = res.message || "Login failed";
          this.alertService.error(res.message || "Login failed");
        }
      },
      (error) => {
        // console.error(error);
        // this.errorMessage = error.error.message || "An error occurred during login";
        this.alertService.error(
          error.error.message || "An error occurred during login"
        );
      }
    );
  }

  onInputChange() {
    this.errorMessage = "";
  }
}
