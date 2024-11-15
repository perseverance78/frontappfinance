import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ExpensesService } from '../../services/expenses.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogField, Expenses } from '../../../../core/interface/record';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ExpensesFormComponent } from '../expenses-form/expenses-form.component';
import { EditDialogComponent } from '../../../../shared/components/edit-dialog/edit-dialog.component';

@Component({
  selector: 'app-expenses-table',
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
  templateUrl: './expenses-table.component.html',
  styleUrl: './expenses-table.component.css'
})
export class ExpensesTableComponent {
  displayedColumns: string[] = ['id', 'categoria', 'monto','fecha','descripcion', 'esFijo'];
  dataSource = new MatTableDataSource<Expenses>([]);
  private _liveAnnouncer = inject(LiveAnnouncer);
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private expensesService: ExpensesService, private dialog: MatDialog, private snackBar: MatSnackBar,) {}


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
    const dialogRef = this.dialog.open(ExpensesFormComponent, {
      width: '400px',
      height: '540px',
      panelClass: 'custom-dialog-container'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const id = localStorage.getItem('user_id');
        const expensesData = {
          ...result,
          id
        };
        this.expensesService.addExpenses(expensesData).subscribe({
          next: () => {
            this.snackBar.open('Gasto registrado exitosamente', 'Cerrar', { duration: 3000 });
            this.loadRecords();

          },
          error: () => {
            this.snackBar.open('Error al crear registrar el gasto', 'Cerrar', { duration: 3000 });
          }
        });
      }
    });
  }


  ngOnInit(): void {
    this.loadRecords();
  }

  loadRecords(): void {
    this.expensesService.getExpenses().subscribe(data => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
    }, error => {
      console.error('Error al cargar los datos:', error); // Manejo de errores
    });
  }

  onDoubleClick(expenses: Expenses): void {
    const fields: DialogField[] = [
      { key: 'categoria_id', label: 'Categoria', type: 'text' },
      { key: 'monto', label: 'Monto', type: 'number' },
      { key: 'fecha', label: 'Fecha', type: 'date' },
      { key: 'descripcion', label: 'Descripcion', type: 'text' },
      { key: 'es_fijo', label: 'Es fijo', type: 'number' },
    ];

    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: {
        title: 'Editar Registro',
        fields: fields,
        data: { ...expenses } // Pasamos una copia del registro
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Llamar al servicio para actualizar los datos (según el contexto)
        this.expensesService.updateExpenses(result).subscribe(() => {
          this.loadRecords(); // Recargar los datos después de la actualización
        });
      }
    });
  }

  // drop(event: CdkDragDrop<Expenses[]>): void {
  //   moveItemInArray(this.dataSource.data, event.previousIndex, event.currentIndex);
  //   this.dataSource.data = [...this.dataSource.data];
  //   // Puedes implementar la lógica para actualizar el orden en el servidor si es necesario
  // }

  // confirmDelete(record: Expenses): void {
  //   // const dialogRef = this.dialog.open(ConfirmDialogComponent, {
  //   //   data: { name: record.name }
  //   // });

  //   // dialogRef.afterClosed().subscribe(result => {
  //   //   if (result) {
  //   //     this.expensesService.deleteRecord(record.presupuesto_id).subscribe(() => {
  //   //       this.loadRecords(); // Recarga los datos
  //   //     });
  //   //   }
  //   // });
  // }
}
