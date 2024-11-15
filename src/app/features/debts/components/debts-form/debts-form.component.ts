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
import { BudgetFormComponent } from '../../../budget/components/budget-form/budget-form.component';
import { DebtsService } from '../../services/debts.service';

@Component({
  selector: 'app-debts-form',
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
  templateUrl: './debts-form.component.html',
  styleUrl: './debts-form.component.scss'
})
export class DebtsFormComponent {
  debtsForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private debtsService: DebtsService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<BudgetFormComponent>
  ) {
    // Definimos el formulario y sus validaciones
    this.debtsForm = this.fb.group(
      {
        nombre : [Validators.required],
        monto_total : [Validators.required],
        monto_pagado : [Validators.required],
        fecha_vencimiento : [Validators.required],
        recordatorio : [Validators.required]

      }
      
  );
  }


  // Método para manejar el envío del formulario
  onSubmit() {
    if (this.debtsForm.valid) {
      const id = localStorage.getItem('user_id'); // Captura el ID del usuario desde localStorage

      if (!id) {
        this.snackBar.open('Error: Usuario no autenticado', 'Cerrar', { duration: 3000 });
        return;
      }
      this.dialogRef.close(this.debtsForm.value);
     
      
    }
  }
  onClose(): void {
    this.dialogRef.close();
  }

}
