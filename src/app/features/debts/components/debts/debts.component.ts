import { Component } from '@angular/core';
import { DebtsTableComponent } from '../debts-table/debts-table.component';


@Component({
  selector: 'app-debts',
  standalone: true,
  imports: [DebtsTableComponent],
  templateUrl: './debts.component.html'
})
export class DebtsComponent {

}
