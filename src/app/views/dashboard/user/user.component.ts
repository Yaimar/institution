import { Component, OnInit, ViewChild } from '@angular/core';
import { HeaderComponent } from '../../../plantilla/header/header.component';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { PaginatorModule } from 'primeng/paginator';
import { User } from '../../../models/user_models';
import { ServiceComponent } from '../../../services/service/service.component';
import { ModalComponent } from '../my-modal/my-modal.component';
import { authInterceptorProviders } from '../../../services/autentication/autentication';
import { SpeedDialModule } from 'primeng/speeddial';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import Notiflix from 'notiflix';
import { status, userupda } from '../../../models/userupdate';
import { courseall } from '../../../models/courseall';
import { MenuComponent } from '../../../plantilla/menu/menu.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    HeaderComponent,
    TableModule,
    CommonModule,
    PaginatorModule,
    ModalComponent,
    SpeedDialModule,
    ButtonModule,
    ToolbarModule,
  MenuComponent
  ],
  providers: [authInterceptorProviders, ServiceComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent implements OnInit {
  modalVisible: boolean = false;
  users: User[] = [];
  @ViewChild(ModalComponent) modal!: ModalComponent;
  estatus: Boolean = false 
  user: User | undefined;
  course: courseall[] = []

  constructor(private readonly serviceComponent: ServiceComponent, ) {}

  async ngOnInit() {
    this.Loaduser()
    this.loadCourse()
  }

  isDialogVisible: boolean = false;

 

  showDialog() 
  {  
    this.modal.selectM = 1 
    this.isDialogVisible = true;

  }
  handleDialogVisibilityChange(isVisible: boolean) {
    this.modalVisible = isVisible;
  }

  async viewcourseuser(sele:number,id: number){
this.modal.selectM = sele
      
await this.serviceComponent.userid(id).subscribe(
  (data: User) => {
    this.user = data;
    this.modal.courseUser = this.user.subjects.map(subject => subject.course.course_name);

    // Filtrar elementos duplicados
    this.modal.courseUser = this.modal.courseUser.filter((item, index, self) =>
      index === self.findIndex((t) => t === item)
    );

    const x = this.modal.courseUser;
    console.log(x);
      
    this.modal.visible = true;
    this.modal.visibleChange.emit(this.modal.visible); 
  },
  (error) => {
    console.error('Error fetching users', error);
  }
);

  }
  async edit(id: number) {
    this.modal.id = id
    this.modal.selectM = 1

    
    try {
      const userData = await this.serviceComponent.userid(id).toPromise();
      if (userData) {
        this.user = userData;
        console.log(this.user);
        this.modal.username = this.user?.name;
        this.modal.lastName = this.user?.lastName;
        this.modal.email = this.user?.email;
        this.modal.phone = this.user?.phone;
        


        const selectcourseIds = this.user.subjects?.map(course => course.course.id_course);
        
        this.modal.selectedcourse = this.modal.optionmulticourse?.filter(course => course.id_course)
        // Obtener las IDs de las asignaturas seleccionadas del usuario
        const selectedSubjectIds = this.user?.subjects?.map(subject => subject.subject.id_subject);
      
    

        // Filtrar las opciones de asignaturas para seleccionar las que el usuario tiene
        this.modal.selectedSubjects = this.modal.subjectOptions?.filter(subject =>
          selectedSubjectIds?.includes(subject.id_subject)
          );

          const selectedcourse = this.user?.subjects?.map(course =>  course.course.id_course);
  
          this.modal.selectedcourse = this.modal.optionmulticourse?.filter(course =>
            selectedcourse?.includes(course.id_course)
            );

          
  
        this.modal.visible = true;
        this.modal.visibleChange.emit(this.modal.visible);
      } else {
        console.error('Error fetching user data: User is undefined');
      }
    } catch (error) {
      console.error('Error fetching user data', error);
    }
  }
  loadCourse() {
    this.serviceComponent.courseall().subscribe(
      (data: courseall[]) => {
        this.course = data
        this.modal.optioncourse = data.map(course => { 
           return { label: course.course_name, value: course.id_course }
          
        })
      
      })
  }

  
 async Loaduser(){
const idrol = 2
  Notiflix.Loading.dots('Cargando...');

   await this.serviceComponent.getUsers(idrol).subscribe(
      (data: User[]) => {
        this.users = data;
      },
      (error) => {
        console.error('Error fetching users', error);
      }
    );
    Notiflix.Loading.remove();



 }


 status(id: number, upstatus : boolean){
  let active = "";
  upstatus == false ? active = "activado" :  active = "desactivado";

 const newUser: status = {
   isActive:!upstatus ,
 };

 console.log(newUser);

 Notiflix.Loading.dots('Cargando...');

 this.serviceComponent.statusUpd(id,newUser).subscribe(
   (response) => {
     console.log('Usuario actulizado con éxito:', response);
     this.Loaduser()
     Notiflix.Loading.remove();
     Notiflix.Notify.success(`Usuario ${active} con éxito.`);
   },
   (error) => {
     console.error('Error al actualizar usuario:', error);
     Notiflix.Loading.remove();
     Notiflix.Notify.failure('Ha ocurrido un error al actualizar el usuario.');
   }
 );


} 

}
 
  

