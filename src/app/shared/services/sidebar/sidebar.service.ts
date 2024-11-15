import { Injectable } from '@angular/core';

export interface SidebarItem {
  title: string;
  icon?: string;
  route?: string;
  expanded? : boolean;
  children?: SidebarItem[];
}

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  constructor() { }

  getSidebarItems(): SidebarItem[] {
    return [
      {
        title: 'Graficas',
        icon: 'mdi mdi-chart-bar',
        route: '/dashboard/charts'
      },
      {
        title: 'Categorias',
        icon: 'mdi mdi-shape-plus',
         route: '/dashboard/categories'
       
      },
      {
        title: 'Ingresos',
        icon: 'mdi mdi-cash-register',
         route: '/dashboard/incomes'
       
      },
      {
        title: 'Gastos',
        icon: 'mdi mdi-cash-remove',
         route: '/dashboard/expenses'
       
      },
      {
        title: 'Presupuesto',
        icon: 'mdi mdi-currency-usd',
        route: '/dashboard/budget'
        
      },
      // {
      //   title: 'Alertas',
      //   icon: 'mdi mdi-message-alert',
      //   route: '/dashboard/alerts'
      // },
      {
        title: 'Deuda',
        icon: 'mdi mdi-currency-usd-off',
        route: '/dashboard/debts'
      },
      // {
      //   title: 'Objetivo Ahorro',
      //   icon: 'mdi mdi-flag-checkered',
      //   route: '/dashboard/savings-goals'
      // },
      
    ];
  }
}
