import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environments';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Category } from '../../../core/interface/record';




@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  private baseUrl: string = environment.apiUrl;

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  constructor(private http: HttpClient) { }

  getCategory(): Observable<Category[]> {
    const token = this.getToken();
    if (!token) {
      console.error('No hay token, no se puede cargar la información.');
       // Evita hacer la solicitud si no hay token
    }
    return this.http.get<Category[]>(`${this.baseUrl}/categoria`);
  }

  addCategory(category: Category): Observable<Category> {
    return this.http.post<Category>(`${this.baseUrl}/categoria`, category);
  }

  updateCategory(category: Category): Observable<Category> {
    return this.http.put<Category>(`${this.baseUrl}/categoria/${category.categoria_id}`, category);
  }

  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/categoria/${id}`);
  }
}


