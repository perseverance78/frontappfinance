import { Component } from '@angular/core';
import { IncomesTableComponent } from '../incomes-table/incomes-table.component';

@Component({
  selector: 'app-incomes',
  standalone: true,
  imports: [IncomesTableComponent],
  templateUrl: './incomes.component.html'
})
export class IncomesComponent {

}
