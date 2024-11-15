import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, inject, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { MatPaginator, MatPaginatorModule } from "@angular/material/paginator";
import { MatIconModule } from "@angular/material/icon";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { CdkDragDrop, DragDropModule, moveItemInArray } from "@angular/cdk/drag-drop";
import { EditDialogComponent } from '../../../../shared/components/edit-dialog/edit-dialog.component';
import { CategoryService } from '../../services/category.service';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { Category, DialogField} from '../../../../core/interface/record';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSort, MatSortModule, Sort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CategoryFormComponent } from '../category-form/category-form.component';



@Component({
  selector: 'app-table',
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
  templateUrl: './table.component.html',
  styleUrl: './table.component.css'
})
export class TableComponent implements AfterViewInit{
  displayedColumns: string[] = ['id', 'nombre', 'tipo'];
  dataSource = new MatTableDataSource<Category>([]);
  private _liveAnnouncer = inject(LiveAnnouncer);
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private categoryService: CategoryService, private dialog: MatDialog, private snackBar: MatSnackBar,) {}

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
    const dialogRef = this.dialog.open(CategoryFormComponent, {
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
        this.categoryService.addCategory(categoryData).subscribe({
          next: () => {
            this.snackBar.open('Categoria registrada exitosamente', 'Cerrar', { duration: 3000 });
            this.loadRecords();

          },
          error: () => {
            this.snackBar.open('Error al registrar la categoria', 'Cerrar', { duration: 3000 });
          }
        });
      }
    });
  }


  ngOnInit(): void {
    this.loadRecords();
  }

  loadRecords(): void {
    this.categoryService.getCategory().subscribe(data => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
    }, error => {
      console.error('Error al cargar los datos:', error); // Manejo de errores
    });
  }

  onDoubleClick(category: Category): void {
    const fields: DialogField[] = [
      { key: 'nombre', label: 'Nombre', type: 'text' },
      { key: 'tipo', label: 'Tipo', type: 'text' },
    ];

    const dialogRef = this.dialog.open(EditDialogComponent, {
      data: {
        title: 'Editar Registro',
        fields: fields,
        data: { ...category } // Pasamos una copia del registro
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Llamar al servicio para actualizar los datos (según el contexto)
        this.categoryService.updateCategory(result).subscribe(() => {
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
