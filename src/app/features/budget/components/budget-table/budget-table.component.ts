import { CdkDragDrop, DragDropModule, moveItemInArray } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Budget, DialogField } from '../../../../core/interface/record';
import { BudgetService } from '../../services/budget.service';
import { EditDialogComponent } from '../../../../shared/components/edit-dialog/edit-dialog.component';
import {MatFormFieldModule} from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { BudgetFormComponent } from '../budget-form/budget-form.component';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
  {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
  {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
  {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
  {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
  {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
  {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
  {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
  {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
  {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
];


@Component({
  selector: 'app-budget-table',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    DragDropModule,
    MatFormFieldModule,
    MatInputModule,
    MatSortModule
  ],
  templateUrl: './budget-table.component.html',
  styleUrl: './budget-table.component.css'
})


export class BudgetTableComponent  implements AfterViewInit{
  displayedColumns: string[] = ['id', 'categoria', 'monto','fechaInicio','fechaFin'];
  dataSource = new MatTableDataSource<Budget>([]);
  private _liveAnnouncer = inject(LiveAnnouncer);
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private budgetService: BudgetService, private dialog: MatDialog, private snackBar: MatSnackBar,) {}


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }


   /** Announce the change in sort state for assistive technology. */
   announceSortChange(sortState: Sort) {
   
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  openForm(): void {
    const dialogRef = this.dialog.open(BudgetFormComponent, {
      width: '400px',
      height: '540px',
      panelClass: 'custom-dialog-container'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const id = localStorage.getItem('user_id');
        const categoryData = {
          ...result,
          id
        };
        this.budgetService.addBudget(categoryData).subscribe({
          next: () => {
            this.snackBar.open('Categoría creada exitosamente', 'Cerrar', { duration: 3000 });
            this.loadRecords();

          },
          error: () => {
            this.snackBar.open('Error al crear la categoría', 'Cerrar', { duration: 3000 });
          }
        });
      }
    });
  }


  ngOnInit(): void {
    this.loadRecords();
  }

  loadRecords(): void {
    this.budgetService.getBudget().subscribe(data => {
      console.log(data)
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
    }, error => {
      console.error('Error al cargar los datos:', error); // Manejo de errores
    });
  }

  onDoubleClick(record: Budget): void {
    const fields: DialogField[] = [
      { key: 'categoria_id', label: 'Nombre categoria', type: 'text' },
      { key: 'monto_max', label: 'Monto', type: 'number' },
      { key: 'fecha_inicio', label: 'Fecha inicio', type: 'date' },
      { key: 'fecha_fin', label: 'Fecha fin', type: 'date' }
    ];

    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: {
        title: 'Editar Registro',
        fields: fields,
        data: { ...record } // Pasamos una copia del registro
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Llamar al servicio para actualizar los datos (según el contexto)
        this.budgetService.updateBudget(result).subscribe(() => {
          this.loadRecords(); // Recargar los datos después de la actualización
        });
      }
    });
  }

  // drop(event: CdkDragDrop<Budget[]>): void {
  //   moveItemInArray(this.dataSource.data, event.previousIndex, event.currentIndex);
  //   this.dataSource.data = [...this.dataSource.data];
  //   // Puedes implementar la lógica para actualizar el orden en el servidor si es necesario
  // }

  // confirmDelete(record: Budget): void {
  //   // const dialogRef = this.dialog.open(ConfirmDialogComponent, {
  //   //   data: { name: record.name }
  //   // });

  //   // dialogRef.afterClosed().subscribe(result => {
  //   //   if (result) {
  //   //     this.budgetService.deleteRecord(record.presupuesto_id).subscribe(() => {
  //   //       this.loadRecords(); // Recarga los datos
  //   //     });
  //   //   }
  //   // });
  // }

}
