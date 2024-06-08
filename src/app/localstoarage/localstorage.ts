import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService  {

  constructor() { }
  private readonly TOKEN_KEY = 'token';
  private  readonly USER_ID_KEY = 'user_id'; // Define una clave estática para localStorage

  
  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }



  getUserId(): string | null {
    return localStorage.getItem(this.USER_ID_KEY); // Obtiene el valor como cadena
  }

  setUserId(id: number): void {
    localStorage.setItem(this.USER_ID_KEY, id.toString()); // Convierte el número a cadena
  }

  removeUserId(): void {
    localStorage.removeItem(this.USER_ID_KEY); // Elimina el ID de localStorage
  }
}

