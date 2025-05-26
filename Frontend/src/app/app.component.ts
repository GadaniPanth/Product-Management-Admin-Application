import { Component } from '@angular/core';
import { NavigationEnd, Route, Router } from '@angular/router';
import { Navigation } from 'swiper';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Inventory-Management';

  IsDashboard: boolean = true;

  private _isMenuOpen = false;
  get isMenuOpen(): boolean {
    return this._isMenuOpen;
  }
  set isMenuOpen(value: boolean) {
    this._isMenuOpen = value;
    document.body.style.overflow = value ? 'hidden' : '';
  }

  onMenuClick(event: MouseEvent) {
    this.isMenuOpen = !this.isMenuOpen
  }

  constructor(private router: Router){
    this.router.events.subscribe((e: any)=>{
      if(e instanceof NavigationEnd){
        // console.log(e.url);
        if(e.url.includes('admin') || e.url.includes('login') || e.url == '/'){
          this.IsDashboard = true;
        }else {
          this.IsDashboard = false;
        }
      }
    });

    document.addEventListener('keydown',(e)=>{
      if(e.code.toLowerCase() == 'escape'){
        this.isMenuOpen = false;
      };
    })
  }
}
