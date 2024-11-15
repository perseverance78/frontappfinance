import { Component } from '@angular/core';
import { ExpensesTableComponent } from '../expenses-table/expenses-table.component';

@Component({
  selector: 'app-expenses',
  standalone: true,
  imports: [ExpensesTableComponent],
  templateUrl: './expenses.component.html'
})
export class ExpensesComponent {

}
