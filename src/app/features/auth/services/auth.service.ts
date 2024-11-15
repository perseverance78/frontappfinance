import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environments';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { response } from 'express';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.apiUrl;
  private access_token:string | null = null;
  private user_id:string | null = null;
  private isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
  }


  constructor(private http: HttpClient) {
    if (this.isBrowser()) {
      this.access_token = localStorage.getItem('access_token');
    }
  }

   // Método para obtener datos (requiere autenticación)
  //  getData(): Observable<any> {
  //   return this.http.get<{user:string}>(`${this.baseUrl}/me`).pipe(
  //     tap(response => {
  //       this.user = response.user;
  //       localStorage.setItem('user', this.user)
  //     })
  //   );
  // }

  // Método para iniciar sesión
  login(email: string, password: string): Observable<any> {
    return this.http.post<{ access_token: string, user_id: string }>(`${this.baseUrl}/login`, { email, password }).pipe(
      tap(response => {
        this.access_token = response.access_token; 
        this.user_id = response.user_id
        localStorage.setItem('access_token', this.access_token); 
        localStorage.setItem('user_id', this.user_id);
      }),
      catchError(this.handleError)
    );
  }

  // Método para verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return this.access_token !== null;
  }

  // Método para cerrar sesión
  logout(): void {
    this.access_token = null;
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_id');
  }

  register(userData: { name:string, email: string; password: string, password_confirmation:string }): Observable<any> {
    console.log(userData);
    return this.http.post(`${this.baseUrl}/register`, userData);
   
  }

  // Manejo de errores (sin `ErrorEvent` para mayor compatibilidad)
  private handleError(error: HttpErrorResponse) {
    const errorMessage = error.error?.message || `Error ${error.status}: ${error.message}`;
    return throwError(errorMessage);
  }


  
}
