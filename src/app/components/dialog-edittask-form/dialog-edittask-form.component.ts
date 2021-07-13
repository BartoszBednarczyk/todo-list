import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Task } from '../board/task';

@Component({
  selector: 'app-dialog-edittask-form',
  templateUrl: './dialog-edittask-form.component.html',
  styleUrls: ['./dialog-edittask-form.component.sass']
})
export class DialogEdittaskFormComponent implements OnInit {

  name: FormControl = new FormControl(this.data.name, [Validators.required])
  description: string = this.data.description;
  isDescriptionVisible: boolean = this.data.isDescriptionVisible;
  color: string = this.data.color;
  nameInvalid: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<DialogEdittaskFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Task,
    private _snackBar: MatSnackBar) { 
      console.log(this.data)
      
  }

  editTask(): void {
    if (this.name.valid) {
      this.data.name = this.name.value;
      this.data.description = this.description;
      this.data.isDescriptionVisible = this.isDescriptionVisible;
      this.data.color = this.color;
      this.openSnackBar('Edited task', 'Close', 3000)
      this.dialogRef.close();
    } else {
      this.openSnackBar("You have to choose task name.", "Close", 3000);
      document.getElementById('name')?.focus()
    }
  }

  deleteTask(): void {
    this.data.name = "";
    this.openSnackBar("Deleted task", "Close", 3000);
    this.dialogRef.close();
  }

  clearForm(): void {
    this.name.reset();
    this.description = "";
    this.isDescriptionVisible = true;
    this.color = "#ecf0f1"
  }

  getErrorMessage(): string {
    return 'You must enter a value';
  }

  openSnackBar(message: string, action: string, duration: number) {
    this._snackBar.open(message, action, {duration});
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
