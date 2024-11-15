import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { ChartConfiguration, ChartData, ChartType } from 'chart.js';

import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { NgChartsModule } from 'ng2-charts';
import { FinancialService } from './services/financial.service';

@Component({
  selector: 'app-charts',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatGridListModule, NgChartsModule],
  templateUrl: './charts.component.html',
  styleUrl: './charts.component.scss'
})
export class ChartsComponent implements OnInit {
  balance: {saldo:number} = {saldo : 0};
  monthlySummary: { ingresos: number, gastos: number, balance: number } = { ingresos: 0, gastos: 0, balance: 0 };

  // Configuración de gráficos
  categoryExpensesData: ChartData<'pie'> = {
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: ['#ff5722', '#ff9800', '#4caf50', '#2196f3', '#9c27b0']
    }]
  };

  incomeExpenseOverTimeData: ChartData<'line'> = {
    labels: [],
    datasets: [
      { data: [], label: 'Ingresos', borderColor: '#4caf50', backgroundColor: 'rgba(76, 175, 80, 0.2)', fill: true },
      { data: [], label: 'Gastos', borderColor: '#f44336', backgroundColor: 'rgba(244, 67, 54, 0.2)', fill: true }
    ]
  };

  chartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: {
          color: '#ffffff'  // Color blanco para la leyenda en tema oscuro
        }
      }
    },
    scales: {
      x: {
        ticks: { color: '#ffffff' },  // Color blanco para las etiquetas en el eje x
        grid: { color: 'rgba(255, 255, 255, 0.1)' }  // Líneas de la cuadrícula en tema oscuro
      },
      y: {
        ticks: { color: '#ffffff' },  // Color blanco para las etiquetas en el eje y
        grid: { color: 'rgba(255, 255, 255, 0.1)' }
      }
    }
  };

  constructor(private financialService: FinancialService) {}

  ngOnInit() {
    this.loadBalance();
    this.loadMonthlySummary();
    this.loadCategoryExpenses();
    this.loadIncomeExpenseOverTime();
  }

  loadBalance() {
    this.financialService.getBalance().subscribe(balance => {
      this.balance = balance
    }, error => {
          console.error('Error al cargar los datos:', error); // Manejo de errores
    });
  }


  loadMonthlySummary() {
    this.financialService.getMonthlySummary().subscribe(summary => {
      this.monthlySummary = summary
    });
  }

  loadCategoryExpenses() {
    this.financialService.getCategoryExpenses().subscribe(data => {
      this.categoryExpensesData.labels = data.map(item => item.categoria);
      this.categoryExpensesData.datasets[0].data = data.map(item => item.total);
    });
  }

  loadIncomeExpenseOverTime() {
    this.financialService.getIncomeExpenseOverTime().subscribe(data => {
      this.incomeExpenseOverTimeData.labels = data.map(item => item.mes);
      this.incomeExpenseOverTimeData.datasets[0].data = data.map(item => item.ingresos);
      this.incomeExpenseOverTimeData.datasets[1].data = data.map(item => item.gastos);
    });
  }
}
