import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { Router } from '@angular/router';
import { ToolbarModule } from 'primeng/toolbar';
import { ServiceComponent } from '../../services/service/service.component';
import { User } from '../../models/user_models';
import { LocalStorageService } from '../../localstoarage/localstorage';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [ToolbarModule,MenubarModule,
     BadgeModule, AvatarModule, 
     InputTextModule, RippleModule, CommonModule,
    ServiceComponent],
    providers: [

      ServiceComponent
    ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  userName: string = 'Nombre del Usuario'; // Este debería ser dinámico en un caso real
  items?: MenuItem[];
  user : User  | undefined
  name?: string;
  constructor(private router: Router  ,private readonly serviceComponent : ServiceComponent,
    private local : LocalStorageService
  ) {}

  ngOnInit() {
    this.items = [
      {
        label: 'Cerrar sesión',
        icon: 'pi pi-sign-out',
        command: () => {
          this.logout();
        }
      }
    ];
   this.users()

    
  }

  logout() {
    // Lógica para cerrar sesión
    console.log('Cerrando sesión...');
    // Redireccionar al login o hacer otras acciones necesarias
    this.router.navigate(['/login']);
  }




  async users() {
    let id: string | null = this.local.getUserId();
    if (id !== null) {
      // Convertir id a número
      const numericId = Number(id);
      
      // Verificar que la conversión sea exitosa
      if (!isNaN(numericId)) {
        const userData = await this.serviceComponent.userid(numericId).toPromise();
        if (userData) {
          this.user = userData;
          this.name  = this.user.name
      
        } else {
          console.error('Error fetching user data: User is undefined');
        }
      } else {
        console.error('Error: id is not a valid number');
      }
    } else {
      console.error('Error: id is null');
    }
  }
  
  
}
