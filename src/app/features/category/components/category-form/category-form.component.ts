import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { TableComponent } from '../table/table.component';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule, 
    MatInputModule,
    MatSnackBarModule,
    MatSelectModule,
    MatButtonModule,
    TableComponent

  ],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.scss'
})
export class CategoryFormComponent {
  categoryForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<CategoryFormComponent>
  ) {
       // Definimos el formulario y sus validaciones
       this.categoryForm = this.fb.group(
        {
          nombre : [Validators.required],
          tipo : [Validators.required],
  
        }
        
    );
  }

  onSubmit() {
    if (this.categoryForm.valid) {
      const id = localStorage.getItem('user_id'); // Captura el ID del usuario desde localStorage

      if (!id) {
        this.snackBar.open('Error: Usuario no autenticado', 'Cerrar', { duration: 3000 });
        return;
      }
      this.dialogRef.close(this.categoryForm.value);
     
      
    }
  }
  onClose(): void {
    this.dialogRef.close();
  }

}
