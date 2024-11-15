import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';

import { CategoryComponent } from '../category/components/category/category.component';

import { AlertsComponent } from '../alerts/components/alerts.component';
import { ChartsComponent } from '../charts/charts.component';
import { BudgetComponent } from '../budget/components/budget/budget.component';
import { IncomesComponent } from '../incomes/components/incomes/incomes.component';

import { DebtsComponent } from '../debts/components/debts/debts.component';
import { SavingGoalsComponent } from '../saving-goals/components/saving-goals/saving-goals.component';
import { ExpensesComponent } from '../expenses/components/expenses/expenses.component';

const routes: Routes = [
  {
    path: '', 
    component: DashboardComponent,
    children: [
      {path: 'charts', component:ChartsComponent},
      {path: 'categories', component: CategoryComponent},
      {path: 'budget', component:BudgetComponent},
      {path: 'alerts', component:AlertsComponent},
      {path: 'incomes', component:IncomesComponent},
      {path: 'expenses', component:ExpensesComponent},
      {path: 'debts', component:DebtsComponent},
      {path: 'savings-goals', component:SavingGoalsComponent},

    ]
  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
