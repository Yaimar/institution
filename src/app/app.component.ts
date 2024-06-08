import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { authInterceptorProviders } from './services/autentication/autentication';
import { ServiceComponent } from './services/service/service.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
 
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [authInterceptorProviders] 
})
export class AppComponent {
  title = 'ColegioFront';
}
