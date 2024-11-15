import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environments';
import { Observable } from 'rxjs';
import { Expenses } from '../../../core/interface/record';

@Injectable({
  providedIn: 'root'
})
export class ExpensesService {

  private baseUrl: string = environment.apiUrl;

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }
  
 

  constructor(private http: HttpClient) {}

  getExpenses(): Observable<Expenses[]> {
    const token = this.getToken();
    if (!token) {
      console.error('No hay token, no se puede cargar la información.');
       // Evita hacer la solicitud si no hay token
    }
    return this.http.get<Expenses[]>(`${this.baseUrl}/gasto`);
  }

  addExpenses(expenses: Expenses): Observable<Expenses> {
    return this.http.post<Expenses>(`${this.baseUrl}/gasto`, expenses);
  }

  updateExpenses(expenses: Expenses): Observable<Expenses> {
    return this.http.put<Expenses>(`${this.baseUrl}/gasto/${expenses.gasto_id}`, expenses);
  }

  deleteBudget(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/gasto/${id}`);
  }
}
