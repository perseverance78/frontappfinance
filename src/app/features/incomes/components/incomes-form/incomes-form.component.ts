import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { BudgetTableComponent } from '../../../budget/components/budget-table/budget-table.component';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-incomes-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule, 
    MatInputModule,
    MatSnackBarModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    BudgetTableComponent,
    MatNativeDateModule
  ],
  templateUrl: './incomes-form.component.html',
  styleUrl: './incomes-form.component.scss'
})
export class IncomesFormComponent {
  incomeForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<IncomesFormComponent>
  ) {
    // Definimos el formulario y sus validaciones
    this.incomeForm = this.fb.group(
      {
        monto : [Validators.required],
        fecha : [Validators.required],
        fuente : [Validators.required],
        es_fijo : [Validators.required]

      }
      
  );
  }


  // Método para manejar el envío del formulario
  onSubmit() {
    if (this.incomeForm.valid) {
      const id = localStorage.getItem('user_id'); // Captura el ID del usuario desde localStorage

      if (!id) {
        this.snackBar.open('Error: Usuario no autenticado', 'Cerrar', { duration: 3000 });
        return;
      }
      this.dialogRef.close(this.incomeForm.value);
     
      
    }
  }
  onClose(): void {
    this.dialogRef.close();
  }
}
