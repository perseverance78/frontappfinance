import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environments';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Incomes } from '../../../core/interface/record';

@Injectable({
  providedIn: 'root'
})
export class IncomesService {

  private baseUrl: string = environment.apiUrl;

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }
  
 

  constructor(private http: HttpClient) {}

  getIncomes(): Observable<Incomes[]> {
    const token = this.getToken();
    if (!token) {
      console.error('No hay token, no se puede cargar la información.');
       // Evita hacer la solicitud si no hay token
    }
    return this.http.get<Incomes[]>(`${this.baseUrl}/ingreso`);
  }

  addIncomes(incomes: Incomes): Observable<Incomes> {
    return this.http.post<Incomes>(`${this.baseUrl}/ingreso`, incomes);
  }

  updateIncomes(incomes: Incomes): Observable<Incomes> {
    return this.http.put<Incomes>(`${this.baseUrl}/ingreso/${incomes.ingreso_id}`, incomes);
  }

  deleteIncomes(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/ingreso/${id}`);
  }
}
