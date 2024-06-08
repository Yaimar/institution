import { Component, Injectable } from '@angular/core';
import { loginModels } from '../../models/login_model'
import { loginResponciveModels } from '../../models/login_respocive'
import { HTTP_INTERCEPTORS, HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Subject, User } from '../../models/user_models';
import { AuthInterceptor, authInterceptorProviders } from '../autentication/autentication';
import { LocalStorageService } from '../../localstoarage/localstorage';
import { Register } from '../../models/register_models';
import { teachersubjectteacher } from '../../models/teacher-subjectteacher_model';
import { teachersubjectuser } from '../../models/teachersubjectuser';
import { usercourseget } from '../../models/usercourseget';
import { courseall } from '../../models/courseall';
import {  rolesall } from '../../models/rolesall_models';
import { status, userupda } from '../../models/userupdate';


@Component({
  selector: 'app-service',
  standalone: true,
  imports: [],
  templateUrl: './service.component.html',
  styleUrl: './service.component.css',
  

})
export class ServiceComponent {

  url: string = 'http://localhost:3000/';
  id = this.localStorageService.getUserId()
  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) { }

  //Apis para iniciar sessioon
  login(form: loginModels): Observable<loginResponciveModels> {
    const dire = this.url + 'auth/login';
    // Añade 'No-Auth' para evitar que el interceptor aplique el token a esta solicitud
    return this.http.post<loginResponciveModels>(dire, form, { headers: new HttpHeaders({'No-Auth':'True'}) });
  }
//metodo post para registrar usuario
  registerUser(user: Register): Observable<any> {
    const url = `${this.url}auth/register`;
    return this.http.post<any>(url, user);
  }
  //esto trae todos los docentes
  getUsers(idrol : number): Observable<User[]> {
    return this.http.get<User[]>(this.url + 'users/teacher/' + idrol);
  }
    
  //esto trae todas las asignaturas 
  getSubjectall(): Observable<Subject[]> {
    return this.http.get<Subject[]>(this.url + 'subject');
  }

 //esto trae todas las  asignaturas por enlazadas a un usuario 
   getteachersubjectteacher(id : number): Observable<teachersubjectteacher[]> {
    return this.http.get<teachersubjectteacher[]>(this.url + 'teacher-subject/teacher/' + id);
  }
  //esto trae todos los curso asignados a un profesor/docente
  getteachersubjectuser(id : number, SubjectId : any): Observable<teachersubjectuser[]> {
    return this.http.get<teachersubjectuser[]>(this.url + 'teacher-subject/user/' + id + '/subject/'+ SubjectId +'/courses');
  }
  // esto trae todos los usuarios que hagan parte del curso por medio del id
  getusercourse(couseId : any): Observable<usercourseget[]> {
    return this.http.get<usercourseget[]>(this.url + 'user-course/ '+ couseId);
  }
  //esto trae todo los cursos 
  courseall(): Observable<courseall[]> {
    return this.http.get<courseall[]>(this.url + 'course/all ');
  }
 //esto trae todos los roles 
  userrolesall(): Observable<rolesall[]>{
return this.http.get<rolesall[]>(this.url + 'user-role')


  }
  //esto trae un unico usuario por el id
userid(id: number): Observable<User>{
  return this.http.get<User>(this.url + 'users/' + id)

}
//actualizar usuario 
userupdate(id: number,user :userupda ): Observable<userupda>{
  const url = `${this.url}users/${id}`;
    return this.http.patch<userupda>(url, user)

}

statusUpd(id: number,user :status ): Observable<status>{
  const url = `${this.url}users/${id}`;
    return this.http.patch<status>(url, user)

}
  

}
