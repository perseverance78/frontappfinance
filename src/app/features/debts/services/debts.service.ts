import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Debt } from '../../../core/interface/record';

@Injectable({
  providedIn: 'root'
})
export class DebtsService {

  private baseUrl: string = environment.apiUrl;

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  constructor(private http: HttpClient) { }

  getDebt(): Observable<Debt[]> {
    const token = this.getToken();
    if (!token) {
      console.error('No hay token, no se puede cargar la información.');
       // Evita hacer la solicitud si no hay token
    }
    return this.http.get<Debt[]>(`${this.baseUrl}/deuda`);
  }

  addDebt(debt: Debt): Observable<Debt> {
    return this.http.post<Debt>(`${this.baseUrl}/deuda`, debt);
  }

  updateDebt(debt: Debt): Observable<Debt> {
    return this.http.put<Debt>(`${this.baseUrl}/deuda/${debt.deuda_id}`, debt);
  }

  deleteDebt(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/deuda/${id}`);
  }
}
