import { Component, Inject, ViewChild, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { CustomerListComponent } from '../../customer/customer-list/customer-list.component';

@Component({
  selector: 'app-modal-confirm-action',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  templateUrl: './modal-confirm-action.component.html',
  styleUrl: './modal-confirm-action.component.css'
})
export class ModalConfirmActionComponent {
  constructor(
    private dialogRef: MatDialogRef<ModalConfirmActionComponent>
) {
}
  confirm(){
    this.dialogRef.close(true)
  }
  cancel(){
    this.dialogRef.close(false)
  }
}
  

