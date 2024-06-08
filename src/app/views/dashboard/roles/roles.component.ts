import { Component } from '@angular/core';
import { HeaderComponent } from '../../../plantilla/header/header.component';
import { ServiceComponent } from '../../../services/service/service.component';
import { rolesall } from '../../../models/rolesall_models';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ModalComponent } from '../my-modal/my-modal.component';
import { PaginatorModule } from 'primeng/paginator';
import { SpeedDialModule } from 'primeng/speeddial';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [HeaderComponent,TableModule,CommonModule
    ,PaginatorModule,ModalComponent,SpeedDialModule,ButtonModule,ToolbarModule,ServiceComponent],
providers :[ServiceComponent],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css'
})
export class RolesComponent {
roles : rolesall[] = []


constructor( private serviceComponent: ServiceComponent){}
  ngOnInit(): void {
    this.serviceComponent.userrolesall().subscribe(
         (data: rolesall[]) => {
           this.roles = data;
          console.log( this.roles );
         },
         (error) => {
           console.error('Error fetching users', error);
         }
       );
     }
     

  
}
