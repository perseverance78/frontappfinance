
import { Component, inject, ViewChild } from '@angular/core';

import { MatSnackBar} from '@angular/material/snack-bar';

import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { IncomesFormComponent } from '../incomes-form/incomes-form.component';
import { CommonModule } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { IncomesService } from '../../services/incomes.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { EditDialogComponent } from '../../../../shared/components/edit-dialog/edit-dialog.component';
import { DialogField, Incomes } from '../../../../core/interface/record';

@Component({
  selector: 'app-incomes-table',
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
  templateUrl: './incomes-table.component.html',
  styleUrl: './incomes-table.component.css'
})
export class IncomesTableComponent {

  displayedColumns: string[] = ['id', 'monto', 'fecha','fuente','esFijo'];
  dataSource = new MatTableDataSource<Incomes>([]);
  private _liveAnnouncer = inject(LiveAnnouncer);
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private incomesService: IncomesService, private dialog: MatDialog, private snackBar: MatSnackBar,) {}


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
    const dialogRef = this.dialog.open(IncomesFormComponent, {
      width: '400px',
      height: '540px',
      panelClass: 'custom-dialog-container'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const id = localStorage.getItem('user_id');
        const incomesData = {
          ...result,
          id
        };
        this.incomesService.addIncomes(incomesData).subscribe({
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
    this.incomesService.getIncomes().subscribe(data => {
      console.log(data)
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
    }, error => {
      console.error('Error al cargar los datos:', error); // Manejo de errores
    });
  }

  onDoubleClick(incomes: Incomes): void {
    const fields: DialogField[] = [
     
      { key: 'monto', label: 'Monto', type: 'number' },
      { key: 'fecha', label: 'Fecha', type: 'date' },
      { key: 'fuente', label: 'Fuente', type: 'text' },
      { key: 'es_fijo', label: 'Es fijo', type: 'number'}
    ];

    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: {
        title: 'Editar Registro',
        fields: fields,
        data: { ...incomes } // Pasamos una copia del registro
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Llamar al servicio para actualizar los datos (según el contexto)
        this.incomesService.updateIncomes(result).subscribe(() => {
          this.loadRecords(); // Recargar los datos después de la actualización
        });
      }
    });
  }

  // drop(event: CdkDragDrop<Incomes[]>): void {
  //   moveItemInArray(this.dataSource.data, event.previousIndex, event.currentIndex);
  //   this.dataSource.data = [...this.dataSource.data];
  //   // Puedes implementar la lógica para actualizar el orden en el servidor si es necesario
  // }

  // confirmDelete(incomes: Incomes): void {
  //   // const dialogRef = this.dialog.open(ConfirmDialogComponent, {
  //   //   data: { name: incomes.name }
  //   // });

  //   // dialogRef.afterClosed().subscribe(result => {
  //   //   if (result) {
  //   //     this.incomesService.deleteRecord(incomes.presupuesto_id).subscribe(() => {
  //   //       this.loadRecords(); // Recarga los datos
  //   //     });
  //   //   }
  //   // });
  // }


}
