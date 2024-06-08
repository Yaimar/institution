import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  
constructor(private router : Router){}

  isSidebarClosed = true;
  isSidebarLocked = false;

  toggleSidebar(): void {
    if (!this.isSidebarLocked) {
      this.isSidebarClosed = !this.isSidebarClosed;
    }
  }

  toggleLock(): void {
    this.isSidebarLocked = !this.isSidebarLocked;
  }

 ///Redireciones
 student(){

this.router.navigate(['student'])
 }

 users() {
  this.router.navigate(['user']);
}

home(){
  this.router.navigate(['dashboard']);
}

course() {
  this.router.navigate(['course']);
}

roles() {
  this.router.navigate(['roles']);
}


  }


