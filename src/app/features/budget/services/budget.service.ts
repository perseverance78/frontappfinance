import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environments';
import { Observable } from 'rxjs';
import { Budget} from '../../../core/interface/record';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  private baseUrl: string = environment.apiUrl;

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }
  
 

  constructor(private http: HttpClient) {}

  getBudget(): Observable<Budget[]> {
    const token = this.getToken();
    if (!token) {
      console.error('No hay token, no se puede cargar la información.');
       // Evita hacer la solicitud si no hay token
    }
    return this.http.get<Budget[]>(`${this.baseUrl}/presupuesto`);
  }

  addBudget(budget: Budget): Observable<Budget> {
    return this.http.post<Budget>(`${this.baseUrl}/presupuesto`, budget);
  }

  updateBudget(budget: Budget): Observable<Budget> {
    return this.http.put<Budget>(`${this.baseUrl}/presupuesto/${budget.presupuesto_id}`, budget);
  }

  deleteBudget(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/presupuesto/${id}`);
  }
}
