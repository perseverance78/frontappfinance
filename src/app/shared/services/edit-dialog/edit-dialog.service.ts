import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogField } from '../../../core/interface/record';
import { EditDialogComponent } from '../../components/edit-dialog/edit-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class EditDialogService {

  constructor(private dialog: MatDialog) {}

  openEditDialog(fields: DialogField[], data: any, title: string = 'Editar Registro'): Promise<any> {
    const dialogRef = this.dialog.open(EditDialogComponent, {
      width: '400px',
      data: { title, fields, data }
    });

    return dialogRef.afterClosed().toPromise();
  }
}
