import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { BudgetTableComponent } from '../budget-table/budget-table.component';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { BudgetService } from '../../services/budget.service';
import { MatNativeDateModule } from '@angular/material/core';
import { MAT_DATEPICKER_SCROLL_STRATEGY } from '@angular/material/datepicker';
import { Overlay, ScrollStrategy } from '@angular/cdk/overlay';
import { MatDialogRef } from '@angular/material/dialog';

export function scrollFactory(overlay: Overlay): () => ScrollStrategy {
  return () => overlay.scrollStrategies.reposition();
}

@Component({
  selector: 'app-budget-form',
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
    MatNativeDateModule,
  ],
  
  providers: [
    { provide: MAT_DATEPICKER_SCROLL_STRATEGY, useFactory: scrollFactory, deps: [Overlay] }
  ],
  templateUrl: './budget-form.component.html',
  styleUrl: './budget-form.component.scss'
})
export class BudgetFormComponent {
  @ViewChild(BudgetTableComponent) childComponent!: BudgetTableComponent;
  budgetForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private budgetService: BudgetService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<BudgetFormComponent>
  ) {
    // Definimos el formulario y sus validaciones
    this.budgetForm = this.fb.group(
      {
        categoria_id: ['', Validators.required],
        monto_max: ['', Validators.required],
        fecha_inicio:['', Validators.required],
        fecha_fin:['', Validators.required]

      }
      
  );
  }


  // Método para manejar el envío del formulario
  onSubmit() {
    if (this.budgetForm.valid) {
      const id = localStorage.getItem('user_id'); // Captura el ID del usuario desde localStorage

      if (!id) {
        this.snackBar.open('Error: Usuario no autenticado', 'Cerrar', { duration: 3000 });
        return;
      }
      this.dialogRef.close(this.budgetForm.value);
     
      
    }
  }
  onClose(): void {
    this.dialogRef.close();
  }

  

}
