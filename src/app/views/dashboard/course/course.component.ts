import { Component } from '@angular/core';
import { HeaderComponent } from '../../../plantilla/header/header.component';
import { ServiceComponent } from '../../../services/service/service.component';
import { courseall } from '../../../models/courseall';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';
import { ModalComponent } from '../my-modal/my-modal.component';
import { SpeedDialModule } from 'primeng/speeddial';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-course',
  standalone: true,
  imports: [HeaderComponent,TableModule,CommonModule
    ,PaginatorModule,ModalComponent,SpeedDialModule,ButtonModule,FormsModule,ServiceComponent ],
  providers :[ServiceComponent],
  templateUrl: './course.component.html',
  styleUrl: './course.component.css'
})
export class CourseComponent {


  constructor (private readonly serviceComponet: ServiceComponent ){}
 
course : courseall[] = []
globalFilterValue: string = '';

  ngOnInit(): void {
    this.serviceComponet.courseall().subscribe(
         (data: courseall[]) => {
           this.course = data;
         },
         (error) => {
           console.error('Error fetching users', error);
         }
       );
     }

     applyFilterGlobal(event: Event) {
      const inputElement = event.target as HTMLInputElement;
      this.globalFilterValue = inputElement.value;
    }
}
