import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Task } from '../board/task';

@Component({
  selector: 'app-dialog-task-form',
  templateUrl: './dialog-task-form.component.html',
  styleUrls: ['./dialog-task-form.component.sass']
})
export class DialogTaskFormComponent {
  storage: Storage = window.localStorage;
  name: FormControl = new FormControl('', [Validators.required])
  description: string = "";
  isDescriptionVisible: boolean = true;
  color: string = "#ecf0f1";
  nameInvalid: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<DialogTaskFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar) { 
      console.log(this.data.data)
      
  }

  getErrorMessage(): string {
      return 'You must enter a value';
  }

  addTask(): void {
    if (this.name.valid) {
      let temp = new Task(this.name.value, this.description, this.isDescriptionVisible, this.color)
      this.data.data.push(temp)
      //this.storage.setItem('todo', JSON.stringify(this.data.data))
      this.data.func()
      this.openSnackBar('Added new task', 'Close', 3000)
      this.clearForm()
      document.getElementById('name')?.focus();
    } else {
      this.openSnackBar("You have to choose task name", "Close", 3000);
      document.getElementById('name')?.focus()
    }
    
    
  }

  clearForm(): void {
    this.name.reset();
    this.description = "";
    this.isDescriptionVisible = true;
    this.color = "#ecf0f1"
  }

  openSnackBar(message: string, action: string, duration: number) {
    this._snackBar.open(message, action, {duration});
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
