import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-task-dialog',
  templateUrl: './add-task-dialog.component.html',
  styleUrls: ['./add-task-dialog.component.css'],
})
export class AddTaskDialogComponent {
  taskDescription = '';

  constructor(public dialogRef: MatDialogRef<AddTaskDialogComponent>) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
