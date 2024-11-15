import { LiveAnnouncer } from '@angular/cdk/a11y';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { DebtsService } from '../../services/debts.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Debt, DialogField } from '../../../../core/interface/record';
import { DebtsFormComponent } from '../debts-form/debts-form.component';
import { EditDialogComponent } from '../../../../shared/components/edit-dialog/edit-dialog.component';

@Component({
  selector: 'app-debts-table',
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
  templateUrl: './debts-table.component.html',
  styleUrl: './debts-table.component.css'
})
export class DebtsTableComponent implements AfterViewInit {
  displayedColumns: string[] = ['id', 'nombre', 'montoTotal','montoPagado','fechaVencimiento', 'recordatorio'];
  dataSource = new MatTableDataSource<Debt>([]);
  private _liveAnnouncer = inject(LiveAnnouncer);
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private debtsService: DebtsService, private dialog: MatDialog, private snackBar: MatSnackBar,) {}

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
    const dialogRef = this.dialog.open(DebtsFormComponent, {
      width: '400px',
      height: '540px',
      panelClass: 'custom-dialog-container'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const id = localStorage.getItem('user_id');
        const debtData = {
          ...result,
          id
        };
        this.debtsService.addDebt(debtData).subscribe({
          next: () => {
            this.snackBar.open('Deuda registrada exitosamente', 'Cerrar', { duration: 3000 });
            this.loadRecords();

          },
          error: () => {
            this.snackBar.open('Error al registrar la deuda', 'Cerrar', { duration: 3000 });
          }
        });
      }
    });
  }


  ngOnInit(): void {
    this.loadRecords();
  }

  loadRecords(): void {
    this.debtsService.getDebt().subscribe(data => {
      console.log(data)
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
    }, error => {
      console.error('Error al cargar los datos:', error); // Manejo de errores
    });
  }

  onDoubleClick(record: Debt): void {
    const fields: DialogField[] = [
      { key: 'nombre', label: 'Nombre', type: 'text' },
      { key: 'monto_total', label: 'Monto total', type: 'number' },
      { key: 'monto_pagado', label: 'Monto Pagado', type: 'number' },
      { key: 'fecha_vencimiento', label: 'Fecha vencimiento', type: 'date' },
      { key: 'recordatorio', label: 'Recordatorio', type: 'number' }
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
        this.debtsService.updateDebt(result).subscribe(() => {
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
