import { Component } from '@angular/core';
import { TableComponent } from '../table/table.component';

@Component({
  selector: 'app-category',
  standalone: true,
  imports: [TableComponent],
  templateUrl: './category.component.html'
})
export class CategoryComponent {

}
