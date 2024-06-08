import { Component, Input, Output, EventEmitter, ChangeDetectorRef, Optional } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { AvatarModule } from 'primeng/avatar';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { MultiSelectModule } from 'primeng/multiselect';
import { ServiceComponent } from '../../../services/service/service.component';
import { Register } from '../../../models/register_models';
import { Subject } from '../../../models/subject_model';
import Notiflix, { Confirm } from 'notiflix'; 
import { userupda } from '../../../models/userupdate';
import { User } from '../../../models/user_models';
import { UserComponent } from '../user/user.component';
import { courseall } from '../../../models/courseall';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [
    FormsModule,
    AvatarModule,
    InputTextModule,
    ButtonModule,
    CommonModule,
    DialogModule,
    MultiSelectModule,
    DropdownModule
  ],
  templateUrl: './my-modal.component.html',
  styleUrls: ['./my-modal.component.css'],
})
export class ModalComponent {
  selectM!: number;
  id: number = 0;
  username?: string;
  email?: string;
  lastName?: string;
  phone?: number;
  userup: userupda | undefined;
  user: User | undefined;
  selectedSubjects?: Subject[];
  optioncourse: any[] = []
  optionmulticourse: any[] = []
  selectedcourse?: courseall[];
  courseStuden? : string
  subjectOptions?: any[] = [];
  courseUser? : any[] = []
  @Input() visible: boolean = false;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private serviceComponent: ServiceComponent, private cdr: ChangeDetectorRef,
    @Optional() private userComponent: UserComponent ) {
      this.serviceComponent.getSubjectall().subscribe(
      (data: Subject[]) => {
        this.subjectOptions = data;
      },
      (error) => {
        console.error('Error fetching users', error);
      }
    );


    this.serviceComponent.courseall().subscribe(
      (data: courseall[]) => {
      this.optionmulticourse = data;
    });
    
        this.filterDuplicates()
  

  }
  

  saveUser() {
  
    let dinam = ""
    if (!this.username) {
      Notiflix.Notify.failure('Por favor, ingresa tu nombre.');
      return;
    }
    
    if (!this.lastName) {
      Notiflix.Notify.failure('Por favor, ingresa tu apellido.');
      return;
    }
    
    if (!this.email) {
      Notiflix.Notify.failure('Por favor, ingresa tu correo electrónico.');
      return;
    }
    
    if (!this.phone) {
      Notiflix.Notify.failure('Por favor, ingresa tu número de teléfono.');
      return;
    }
    
    if (!this.selectedSubjects?.length && this.selectM === 1) {
      Notiflix.Notify.failure('Por favor, selecciona al menos una asignatura.');
      return;
    }
    
    if (!this.selectedcourse) {
const sc = this.selectedcourse
console.log(sc) 
      Notiflix.Notify.failure('Por favor, selecciona al menos un curso.');
      return;
    }
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(this.email)) {
      Notiflix.Notify.failure('Por favor, introduce un correo electrónico válido.');
      return; 
    }
    this.id == 0 ? dinam = "Crear" : dinam = "editar" 
    Confirm.show(
      'Confirmar',
      `Desea ${dinam} este docente`,
      'Si',
      'No',
      () => {
    
        if (this.id == 0){
        const newUser: Register = {
          name: this.username,
          lastName: this.lastName,
          email: this.email,
          password: 'password',
          isActive: true,
          phone: this.phone,
          rol: this.selectM == 2 ? 'estudiante' : 'docente',
          subjectIds:this.selectM == 2 ? []: this.selectedSubjects?.map(subject => Number(subject.id_subject)),
          courseid: this.selectedcourse?.map(course => Number (course.id_course) ),
 
                };
          
        Notiflix.Loading.dots('Cargando...');
    
        this.serviceComponent.registerUser(newUser).subscribe(
          (response) => {
            console.log('Usuario registrado con éxito:', response);
            this.visible = false;
            this.userComponent.Loaduser()
            this.visibleChange.emit(this.visible);
            Notiflix.Loading.remove();
            Notiflix.Notify.success('Usuario registrado con éxito.');
          },
          (error) => {
            console.error('Error al registrar usuario:', error);
            Notiflix.Loading.remove();
            Notiflix.Notify.failure('Asegúrate de que la(s) asignatura(s) que estás asignando no esté(n) ya asignada(s) a un curso.');
          }
        );
      }else{
        const selectedSubjectIds = this.user?.subjects?.map(subject => subject.subject.id_subject);
        const newUser: userupda = {
    
          name: this.username,
          lastName: this.lastName,
          email: this.email,
          password: 'password',
          phone: this.phone,
          rol: 'docente',
          subjectIds: this.selectedSubjects?.map(subject => Number(subject.id_subject)),
          courseIds: this.selectedcourse?.map(course => Number (course.id_course) )
        };
    
        console.log(newUser);
    
        Notiflix.Loading.dots('Cargando...');
    
        this.serviceComponent.userupdate(this.id,newUser).subscribe(
          (response) => {
            console.log('Usuario actulizado con éxito:', response);
            this.visible = false;
            this.userComponent.Loaduser()
            this.visibleChange.emit(this.visible);
            Notiflix.Loading.remove();
            Notiflix.Notify.success('Usuario actualizado con éxito.');
          },
          (error) => {
            console.error('Error al actualizar usuario:', error);
            Notiflix.Loading.remove();
            Notiflix.Notify.failure('Ha ocurrido un error al actualizar el usuario.');
          }
        );
    
        this.hideDialog()
      }
      },
      () => {

      },
      {
      
          // Configuración de colores y estilos
          okButtonBackground: '#28a745', // Color de fondo del botón "Yes"
          okButtonColor: '#ffffff', // Color del texto del botón "Yes"
          cancelButtonBackground: '#dc3545', // Color de fondo del botón "No"
          cancelButtonColor: '#ffffff', // Color del texto del botón "No"
          titleColor: '#1e90ff', // Color del texto del título
          messageColor: '#333333', // Color del texto del mensaje
          backgroundColor: '#f8f9fa', // Color de fondo del cuadro de diálogo
          borderRadius: '8px', // Radio de borde del cuadro de diálogo
      
      },
      
      );
  
  }

  savestuden(){

console.log("Hola quieres crear un studiante")

  }

  hideDialog() {
    this.username = "";
    this.lastName = "";
    this.email ="";
    this.phone = 0;
    this.id = 0;
    this.visible = false;
    this.visibleChange.emit(this.visible);
    this.selectedSubjects =  []
    this.selectedcourse =  []

  }

  filterDuplicates() {
    this.courseUser = this.courseUser?.filter((item, index, self) =>
        index === self.findIndex((t) => t === item)
    );
}
}
