import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { loginModels } from '../../models/login_model';
import { ServiceComponent } from '../../services/service/service.component';
import { Router } from '@angular/router';
import { loginResponciveModels } from '../../models/login_respocive';
import * as Notiflix from 'notiflix';
import { LocalStorageService } from '../../localstoarage/localstorage';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    FormsModule,
    ReactiveFormsModule,ServiceComponent

  ],
  providers: [

    ServiceComponent
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private serviceComponent: ServiceComponent, private router: Router,
private localStorageService: LocalStorageService

  ) {
    this.loginForm = this.formBuilder.group({
      email: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  onLogin(form: loginModels) {
    Notiflix.Loading.dots('Cargando...'); // Mostrar loading
    this.serviceComponent.login(form).subscribe(
      (data: loginResponciveModels) => {
        Notiflix.Loading.remove(); // Remover loading cuando la respuesta llegue
        if (data.statusCode === 200) {
             this.localStorageService.setToken(data.token);
             this.localStorageService.setUserId( data.id);
          this.router.navigate(['dashboard']);
        }
      },
      (error) => {
        Notiflix.Loading.remove(); // Remover loading en caso de error
        console.error(error);
        if (error.status === 401) {
          Notiflix.Notify.failure('Contraseña incorrecta');
        } else {
          Notiflix.Notify.failure('Error al iniciar sesión');
        }
      }
    );
  }
}
