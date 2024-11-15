import { Component } from '@angular/core';
import { BudgetTableComponent } from '../budget-table/budget-table.component';

@Component({
  selector: 'app-budget',
  standalone: true,
  imports: [BudgetTableComponent],
  templateUrl: './budget.component.html'
})
export class BudgetComponent {

}
