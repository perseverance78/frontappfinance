import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { DialogField } from '../../../core/interface/record';

@Component({
  selector: 'app-edit-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatDialogModule
  ],
  template: `
    <h2 mat-dialog-title>{{ data.title || 'Editar Registro' }}</h2>
    <mat-dialog-content>
      <ng-container *ngFor="let field of data.fields">
        <mat-form-field appearance="fill">
          <mat-label>{{ field.label }}</mat-label>
          <input
            matInput
            [(ngModel)]="data.data[field.key]"
            [type]="field.type"
            [placeholder]="field.placeholder || ''"
            [name]="field.key"
          />
        </mat-form-field>
      </ng-container>
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button (click)="onCancel()">Cancelar</button>
      <button mat-button color="primary" (click)="onSave()">Guardar</button>
    </mat-dialog-actions>
  `,
})
export class EditDialogComponent {

  constructor(
    public dialogRef: MatDialogRef<EditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title?: string; fields: DialogField[]; data: any }
  ) {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave(): void {
    this.dialogRef.close(this.data.data);
  }

}
