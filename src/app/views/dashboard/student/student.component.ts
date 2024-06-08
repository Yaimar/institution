import { Component, OnInit, ViewChild } from '@angular/core';
import { HeaderComponent } from '../../../plantilla/header/header.component';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonModule } from 'primeng/button';
import { LocalStorageService } from '../../../localstoarage/localstorage';
import { ServiceComponent } from '../../../services/service/service.component';
import { teachersubjectteacher } from '../../../models/teacher-subjectteacher_model';
import { PaginatorModule } from 'primeng/paginator';
import { TableModule } from 'primeng/table';
import { usercourseget } from '../../../models/usercourseget';
import { CommonModule } from '@angular/common';
import { User } from '../../../models/user_models';
import { ModalComponent } from '../my-modal/my-modal.component';
import { SpeedDialModule } from 'primeng/speeddial';
import { ToolbarModule } from 'primeng/toolbar';
import { courseall } from '../../../models/courseall';
import { UserComponent } from '../user/user.component';
import { MenuComponent } from '../../../plantilla/menu/menu.component';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [
  MenuComponent,
    HeaderComponent,
    DropdownModule,
    ButtonModule,
    PaginatorModule,
    TableModule,
    CommonModule,
    ModalComponent,
    SpeedDialModule,
    ToolbarModule

  ],

  providers: [ServiceComponent,UserComponent],
  templateUrl: './student.component.html',
  styleUrl: './student.component.css'
})
export class StudentComponent implements OnInit {


  modalVisible: boolean = false;
  subjectOptions: any[] = [];
  gradeOptions: any[] = [];
  users: teachersubjectteacher[] = [];
  selectedSubject: number = 0;
  selectedGrade: number = 0;
  selecteduser: number = 0;
  student: any[] = []
  user: User[] = [];
  useroption: any[] = []
  course: courseall[] = []
  @ViewChild(ModalComponent) modal!: ModalComponent;

  constructor(private localStorageService: LocalStorageService, private readonly serviceComponent: ServiceComponent,
    private usercomponent: UserComponent ) { }




  ngOnInit() {
    this.loadstu()
    this.loadCourse()

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

  onuserChange(event: any) {
    this.selecteduser = event.value;
    this.searchsubject(this.selecteduser);
  }


  onSubjectChange(event: any) {
    this.selectedSubject = event.value;
    this.searchBySubject(this.selecteduser, this.selectedSubject);
  }

  onGradeChange(event: any) {
    this.selectedGrade = event.value;
    this.searchByGrade(this.selectedGrade);
  }

  searchsubject(user: number) {
    this.serviceComponent.getteachersubjectteacher(user).subscribe(
      (data: teachersubjectteacher[]) => {
        this.users = data;
        this.subjectOptions = this.users.map(user => {
          return { label: user.subject_name, value: user.id_subject };
        });
        console.log(this.subjectOptions);
      },
      (error) => {
        console.error('Error fetching users', error);
      }
    );




  }


  searchBySubject(id: number, subjectId: number) {
    this.serviceComponent.getteachersubjectuser(id, subjectId).subscribe(
      (data) => {
        // Asignar los datos recibidos al gradeOptions
        this.gradeOptions = data.map(item => {
          return { label: item.course_name, value: item.id_course };
        });
        console.log('Response data for subject:', data);
        console.log('Grade options:', this.gradeOptions);
      },
      (error) => {
        console.error('Error fetching data for subject', error);
      }
    );
  }




  searchByGrade(idcourse: number) {
    this.serviceComponent.getusercourse(idcourse).subscribe(
      (data: usercourseget[]) => {
        this.student = data;
        console.log(this.student);
      },
      (error) => {
        console.error('Error fetching users', error);
      }
    );
  }




  search(idcourse: number) {


  }
  handleDialogVisibilityChange(isVisible: boolean) {
    this.modalVisible = isVisible;
  }

  isDialogVisib: boolean = false;

  showDialo() {
    this.isDialogVisib = true;
    this.modal.selectM = 2
  }

  status(id: number, upstatus : boolean){
    this.usercomponent.status(id,upstatus)


    
  }

  
  loadstu() {
    const roles = [3, 2]; 
    roles.forEach(idrol => {
      this.serviceComponent.getUsers(idrol).subscribe(
        (data: User[]) => {
          if (idrol === 3) {
            this.student = data;
          } else if (idrol === 2) {
            this.useroption = data.map(user => {
              return { label: user.name, value: user.id };
            });
          }
  
        },
        (error) => {
          console.error(`Error fetching users for role ${idrol}`, error);
        }
      );
    });
  }
  
}
