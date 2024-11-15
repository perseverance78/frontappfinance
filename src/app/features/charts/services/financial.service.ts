import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../../../environments/environments';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FinancialService {

  private baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getMonthlySummary(): Observable<{ ingresos: number, gastos: number, balance: number }> {
    return this.http.get<{ ingresos: number, gastos: number, balance: number }>(`${this.baseUrl}/reportes/resumen-mensual`);
  }

  getCategoryExpenses(): Observable<{ categoria: string, total: number }[]> {
    return this.http.get<{ categoria: string, total: number }[]>(`${this.baseUrl}/reportes/graficos/gastos-categoria`);
  }

  getBalance(): Observable<{saldo:number}> {
    return this.http.get<{saldo:number}>(`${this.baseUrl}/reportes/saldo-actual`);
  }

  getIncomeExpenseOverTime(): Observable<{ mes: string, ingresos: number, gastos: number }[]> {
    return this.http.get<{ mes: string, ingresos: number, gastos: number }[]>(`${this.baseUrl}/reportes/graficos/ingresos-vs-gastos`);
  }

  getDebtChart(): Observable<{ fecha_vencimiento: string, monto: number }[]> {
    return this.http.get<{ fecha_vencimiento: string, monto: number }[]>(`${this.baseUrl}/reportes/graficos/deudas`);
  }

  getSavingProgress(): Observable<{ objetivo: number, ahorrado: number, progreso: number }[]> {
    return this.http.get<{ objetivo: number, ahorrado: number, progreso: number }[]>(`${this.baseUrl}/reportes/graficos/progreso-ahorro`);
  }

  getWeeklyFlow(): Observable<{ dia: string, ingresos: number, gastos: number }[]> {
    return this.http.get<{ dia: string, ingresos: number, gastos: number }[]>(`${this.baseUrl}/reportes/flujo-semanal`);
  }

  getIncomeExpenseProjection(): Observable<{ proyeccion_ingresos_mensual: number, proyeccion_gastos_mensual: number }> {
    return this.http.get<{ proyeccion_ingresos_mensual: number, proyeccion_gastos_mensual: number }>(`${this.baseUrl}/reportes/proyeccion-ingresos-gastos`);
  }
}
